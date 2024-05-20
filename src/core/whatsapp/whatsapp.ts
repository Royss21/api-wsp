import makeWASocket, {
  ConnectionState,
  SocketConfig,
  WABrowserDescription,
} from '@adiwajshing/baileys';

import axios, { AxiosInstance } from 'axios';
import { Collection, Connection } from 'mongoose';
import * as QRCode from 'qrcode';

import { CreateInstanceDto } from 'src/api/instance/dtos';

import { WebhookSendType, WhatsAppConnection } from 'src/common/enums';
import { envs } from '../config';
import { mongoAuthState } from '../helpers/db';
import { getWhatsAppId } from '../helpers/whatsapp';
import { IWhatsAppAuthState } from '../interfaces';
import { IWhatsApp } from '../interfaces/whatsapp.interface';
import { WspGlobalInstance } from './whatsapp-global';
import { WhatsAppInstance } from './whatsapp-instance';

export class WhatsApp implements IWhatsApp {
  socketConfig: SocketConfig;
  key: string;
  allowWebhook: boolean;
  webhook?: string;
  authState: IWhatsAppAuthState;
  collection: Collection;
  instance: WhatsAppInstance;
  axiosInstance: AxiosInstance;
  connectionRetries: number;
  maxConnectionRetries: number;

  constructor(
    private connection: Connection,
    instanceDto: CreateInstanceDto,
  ) {
    const { key, webhookUrl, connectionRetry } = instanceDto;
    this.key = key;
    this.webhook = webhookUrl ? webhookUrl : envs.webhook_url;
    this.connectionRetries = 0;
    this.maxConnectionRetries = connectionRetry
      ? connectionRetry
      : envs.instance_max_connection_retries;
    this.allowWebhook = envs.webhook_enabled;
    this.instance = new WhatsAppInstance(key);
    this.instance.customWebhook = this.webhook;
    this.socketConfig = {
      defaultQueryTimeoutMs: undefined,
      printQRInTerminal: false,
    } as SocketConfig;
    this.axiosInstance = axios.create({
      baseURL: this.webhook,
    });
  }

  async init() {
    this.collection = this.connection.collection(this.key);
    const { state, saveCreds } = await mongoAuthState(this.collection);
    this.authState = {
      state: state,
      saveCreds: saveCreds,
    } as IWhatsAppAuthState;
    this.socketConfig.auth = this.authState.state;
    this.socketConfig.browser = Object.values({
      platform: this.key.toUpperCase(),
      browser: envs.client_browser || 'Chrome',
      version: envs.client_version || '4.0.0',
    }) as WABrowserDescription;
    this.instance.sock = makeWASocket(this.socketConfig);

    await this.setHandler();

    return this;
  }

  async setHandler() {
    const sock = this.instance.sock;

    //OTHERS
    sock?.ev.on('creds.update', this.authState.saveCreds);
    sock?.ev.on(
      'connection.update',
      async (data) => await this._connectionUpdate(data),
    );
    sock?.ev.on(
      'messaging-history.set',
      ({ chats, contacts, messages, isLatest }) => {
        console.log('chat.set', { chats, contacts, messages, isLatest });
      },
    );

    //CHATS
    sock?.ev.on('chats.set', (data) => {
      console.log('chat.set', { data });
    });
    sock?.ev.on('chats.upsert', (data) => {
      console.log('chats.upsert', { data });
    });
    sock?.ev.on('chats.update', (data) => {
      console.log('chats.update', { data });
    });
    sock?.ev.on('chats.delete', (data) => {
      console.log('chats.delete', { data });
    });

    //PRESENCE
    sock?.ev.on('presence.update', async (data) => {
      console.log('presence.update', { data });
    });

    //MESSAGES
    sock?.ev.on('messages.upsert', (data) => {
      console.log('messages.upsert', { data });
    });
    sock?.ev.on('messages.update', async (data) => {
      console.log('messages.update', { data });
    });
    sock?.ev.on('messages.delete', (data) => {
      console.log('messages.delete', { data });
    });
    sock?.ev.on('messages.reaction', (data) => {
      console.log('messages.reaction', { data });
    });

    //GROUPS
    sock?.ev.on('groups.update', async (data) => {
      console.log('groups.update', { data });
    });
    sock?.ev.on('groups.upsert', (data) => {
      console.log('groups.upsert', { data });
    });
    sock?.ev.on('group-participants.update', (data) => {
      console.log('group-participants.update', { data });
    });
  }

  async sendWebhook(type: string, body: any) {
    if (!this.allowWebhook) return;
    await this.axiosInstance
      .post('', {
        type,
        body: JSON.stringify(body),
        instanceKey: this.key,
      })
      .catch(() => {});
  }

  async sendText(phoneNumber: string, textMessage: string) {
    const whatsAppId = await getWhatsAppId(this.instance, phoneNumber);
    const data = await this.instance.sock?.sendMessage(whatsAppId, {
      text: textMessage,
    });
    return data;
  }

  async sendMedia(
    phoneNumber: string,
    file: any,
    type: string,
    textMessage?: string,
    fileName?: string,
  ) {
    const whatsAppId = await getWhatsAppId(this.instance, phoneNumber);
    const data = await this.instance.sock?.sendMessage(whatsAppId, {
      [type]: file.buffer,
      mimetype: file.mimetype,
      caption: textMessage || '',
      ptt: type === 'audio',
      fileName: fileName || file.originalname || '',
    });
    return data;
  }

  async sendMediaUrl(
    phoneNumber: string,
    url: string,
    type: string,
    mimetype: string,
    fileName?: string,
    textMessage?: string,
  ) {
    const whatsAppId = await getWhatsAppId(this.instance, phoneNumber);
    const data = await this.instance.sock?.sendMessage(whatsAppId, {
      [type]: {
        url: url,
      },
      mimetype: mimetype,
      caption: textMessage || '',
      fileName: fileName || '',
    });
    return data;
  }

  private async _connectionUpdate(update: Partial<ConnectionState>) {
    const { connection, lastDisconnect, qr } = update;

    if (connection === WhatsAppConnection.CONNECTING) return;

    if (connection === WhatsAppConnection.CLOSE) {
      this.instance.online = false;
      this.connectionRetries++;

      if (this.connectionRetries > this.maxConnectionRetries) {
        if (this.key in WspGlobalInstance) {
          this._disconnectInstance();
          await this.connection.dropCollection(this.key);
        }
      } else if (lastDisconnect?.error) {
        await this.init();
      }
    } else if (connection === WhatsAppConnection.OPEN) {
      this.instance.online = true;
      this.connectionRetries = 0;
    }

    await this.sendWebhook(WebhookSendType.CONNECTION, {
      connection: connection,
    });

    if (qr) {
      const url = await QRCode.toDataURL(qr);
      this.instance.qr = url;
      this.instance.qrRetry = this.instance.qrRetry + 1;

      if (this.instance.qrRetry > envs.instance_max_retry_qr)
        this._disconnectInstance();
    }
  }

  private _disconnectInstance() {
    const instance = WspGlobalInstance[this.key]?.instance;

    instance?.sock?.ev?.removeAllListeners();
    instance?.sock?.ws?.close();
    delete WspGlobalInstance[this.key];
  }
}
