export interface IWhatsAppInstance {
  key: string;
  chats: any[];
  qr: string;
  messages: any[];
  qrRetry: number;
  customWebhook: string;
  sock: any;
  online: boolean;
}
