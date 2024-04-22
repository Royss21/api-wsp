import makeWASocket, {
  DisconnectReason,
  SocketConfig,
  WABrowserDescription,
} from '@adiwajshing/baileys';
import axios, { AxiosInstance } from 'axios';
import { Collection, Connection } from 'mongoose';
import { sendWebhookType, whatsappConnectionType } from 'src/common/constants';
import { mongoDBAuthState } from '../helpers';
import { IWhatsAppAuthState } from '../interfaces';
import { WhatsAppInstance } from './whatsapp-instance';

import * as QRCode from 'qrcode';

export class WhatsApp {
  socketConfig: SocketConfig;
  key: string;
  allowWebhook: boolean;
  webhook?: string;
  authState: IWhatsAppAuthState;
  collection: Collection;
  instance: WhatsAppInstance;
  axiosInstance: AxiosInstance;

  constructor(
    private connection: Connection,
    key: string,
    webhook?: string | undefined,
  ) {
    this.key = key;
    this.webhook = webhook && process.env.WEBHOOK_URL;
    this.allowWebhook = process.env.WEBHOOK_ENABLED === 'true';
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
    const { state, saveCreds } = await mongoDBAuthState(this.collection);
    this.authState = {
      state: state,
      saveCreds: saveCreds,
    } as IWhatsAppAuthState;
    this.socketConfig.auth = this.authState.state;
    this.socketConfig.browser = Object.values({
      platform: process.env.CLIENT_PLATFORM || 'Whatsapp MD',
      browser: process.env.CLIENT_BROWSER || 'Chrome',
      version: process.env.CLIENT_VERSION || '4.0.0',
    }) as WABrowserDescription;
    this.instance.sock = makeWASocket(this.socketConfig);
    //TODO: agregar eventos de comportamiento
    return this;
  }

  async setHandler() {
    const sock = this.instance.sock;
    sock?.ev.on('creds.update', this.authState.saveCreds);

    sock?.ev.on('connection.update', async (update) => {
      const { CONNECTING, CLOSE, OPEN } = whatsappConnectionType;
      const { ALL, CONNECTION, CONNECTIONOPEN, CONNECTIONUPDATE, CONNECTIONCLOSE } = sendWebhookType;
      const { connection, lastDisconnect, qr } = update;

      if (connection === CONNECTING) return;

      if (connection === CLOSE) {
        if (
          lastDisconnect?.error?.output?.statusCode !==
          DisconnectReason.loggedOut
        ) {
          await this.init();
        }

        // if (
        //   [ALL, CONNECTION, CONNECTIONUPDATE, CONNECTIONCLOSE].some(
        //     (e) => process.env..webhookAllowedEvents.includes(e),
        //   )
        // )
        //   await this.SendWebhook(
        //     'connection',
        //     {
        //       connection: connection,
        //     },
        //     this.key,
        //   );
      } 
      else if (connection === OPEN) {
        this.instance.online = true;
        if (
          ['all', 'connection', 'connection.update', 'connection:open'].some(
            (e) => config.webhookAllowedEvents.includes(e),
          )
        )
          await this.SendWebhook(
            'connection',
            {
              connection: connection,
            },
            this.key,
          );
      }

      if (qr) {
        QRCode.toDataURL(qr).then((url) => {
          this.instance.qr = url;
          this.instance.qrRetry++;
          if (this.instance.qrRetry >= config.instance.maxRetryQr) {
            // close WebSocket connection
            this.instance.sock.ws.close();
            // remove all events
            this.instance.sock.ev.removeAllListeners();
            this.instance.qr = ' ';
            //logger.info('socket connection terminated')
          }
        });
      }
    });
  }
}
