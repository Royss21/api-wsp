import { WspInstance } from 'src/core/wsp-instance/wsp-app-instance';
import { getWhatsAppId, verifyId } from './';

export const sendTextMessage = async (
  instance: WspInstance,
  to: string,
  message: string,
) => {
  await verifyId(instance, getWhatsAppId(to));
  const data = await instance.sock?.sendMessage(getWhatsAppId(to), {
    text: message,
  });
  return data;
};
