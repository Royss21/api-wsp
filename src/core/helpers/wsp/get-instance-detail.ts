import { WspInstance } from 'src/core/wsp-instance/wsp-app-instance';

export const getInstanceDetail = (instance: WspInstance, key: string) => {
  return {
    instance_key: key,
    phone_connected: instance?.online,
    webhookUrl: instance.customWebhook,
    user: instance.online ? instance.sock?.user : {},
  };
};
