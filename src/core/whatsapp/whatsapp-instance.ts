import { IWhatsAppInstance } from '../interfaces/whatsapp-instance.interface';

export class WhatsAppInstance implements IWhatsAppInstance {
  key: string = '';
  chats: any[] = [];
  qr: string = '';
  messages: any[] = [];
  qrRetry: number = 0;
  customWebhook: string = '';
  sock: any = null;
  online: boolean = false;

  constructor(key: string) {
    this.key = key;
  }
}
