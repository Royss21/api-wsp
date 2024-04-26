import makeWASocket, {
  ConnectionState,
  SocketConfig,
  WABrowserDescription,
} from '@adiwajshing/baileys';

import axios, { AxiosInstance } from 'axios';
import { Collection, Connection } from 'mongoose';
import * as QRCode from 'qrcode';

import {
  CONNECTION,
  WSP_CONNECTION_OPEN,
  WSP_CONNECTION_CLOSE,
  WSP_CONNECTING,
} from 'src/common/constants';
import { CreateInstanceDto } from 'src/api/instance/dtos';

import { envs } from '../config';
import { mongoAuthState } from '../helpers/db';
import { IWhatsAppAuthState } from '../interfaces';
import { WspGlobalInstance } from './whatsapp-global';
import { WhatsAppInstance } from './whatsapp-instance';

export class WhatsApp {
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
      platform: envs.client_platform || 'Whatsapp MD',
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
      async (data) => await this.connectionUpdate(data),
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

  private async connectionUpdate(update: Partial<ConnectionState>) {
    const { connection, lastDisconnect, qr } = update;

    if (connection === WSP_CONNECTING) return;

    if (connection === WSP_CONNECTION_CLOSE) {
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
    } else if (connection === WSP_CONNECTION_OPEN) {
      this.instance.online = true;
      this.connectionRetries = 0;
    }

    await this.sendWebhook(CONNECTION, {
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
    const instance = WspGlobalInstance[this.key].instance;

    instance?.sock?.ev?.removeAllListeners();
    instance?.sock?.ws?.close();
    delete WspGlobalInstance[this.key];
  }
}
