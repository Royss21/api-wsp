import { WhatsAppInstance } from 'src/core/whatsapp/whatsapp-instance';

export const getInstanceDetail = (instance: WhatsAppInstance) => {
  const { key, online, customWebhook, sock } = instance;
  return {
    instance_key: key,
    phone_connected: online || '',
    webhookUrl: customWebhook || '',
    user: online ? sock?.user : {},
  };
};
