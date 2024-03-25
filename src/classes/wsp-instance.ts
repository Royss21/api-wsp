import { IWspInstance } from './';

export class WspInstance implements IWspInstance {
  key: string = '';
  chats: any[] = [];
  qr: string = '';
  messages: any[] = [];
  qrRetry: number = 0;
  customWebhook: string = '';
  sock: any;
  online: boolean;

  constructor(key: string, customWehbook: string = '') {
    this.key = key;
    this.customWebhook = customWehbook;
    this.qrRetry = 0;
    this.key = '';
    this.chats = [];
    this.qr = '';
    this.messages = [];
    this.qrRetry = 0;
    this.sock = {};
    this.customWebhook = '';
    this.online = false;
  }
}
