import { WhatsAppInstance } from 'src/core/whatsapp/whatsapp-instance';
import { getWhatsAppId, verifyId } from '.';

export const sendTextMessage = async (
  instance: WhatsAppInstance,
  to: string,
  message: string,
) => {
  await verifyId(instance, getWhatsAppId(to));
  const data = await instance.sock?.sendMessage(getWhatsAppId(to), {
    text: message,
  });
  return data;
};
