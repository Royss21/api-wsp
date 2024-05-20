import { SocketConfig } from '@adiwajshing/baileys';
import { AxiosInstance } from 'axios';
import { Collection } from 'mongoose';
import { MessageKeyDto } from 'src/api/message/dtos/message-key.dto';
import { WebhookSendType } from 'src/common/enums';
import { WhatsAppInstance } from '../whatsapp/whatsapp-instance';
import { IWhatsAppAuthState } from './whatsapp-auth-state.interface';

export interface IWhatsApp {
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

  sendWebhook: (type: WebhookSendType, body: any) => Promise<void>;
  sendText: (phoneNumber: string, textMessage: string) => Promise<any>;
  sendMedia: (
    phoneNumber: string,
    file: any,
    type: string,
    textMessage?: string,
    fileName?: string,
  ) => Promise<any>;
  sendMediaUrl: (
    phoneNumber: string,
    url: string,
    type: string,
    mimetype: string,
    fileName: string,
    textMessage?: string,
  ) => Promise<any>;
  // reactMessage: (
  //   phoneNumber: string,
  //   textMessage: string,
  //   key: MessageKeyDto,
  // ) => Promise<any>;
}
