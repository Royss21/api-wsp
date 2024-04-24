import { WhatsAppInstance } from 'src/core/whatsapp/whatsapp-instance';

export const getInstanceDetail = (instance: WhatsAppInstance, key: string) => {
  return {
    instance_key: key,
    phone_connected: instance?.online,
    webhookUrl: instance.customWebhook,
    user: instance.online ? instance.sock?.user : {},
  };
};
