import { WhatsAppInstance } from 'src/core/whatsapp/whatsapp-instance';
import { getWhatsAppId, verifyId } from '.';

export const sendTextMessage = async (
  instance: WhatsAppInstance,
  phoneNumber: string,
  messageText: string,
) => {
  const whatsAppId = getWhatsAppId(phoneNumber);
  await verifyId(instance, whatsAppId);
  const data = await instance.sock?.sendMessage(whatsAppId, {
    text: messageText,
  });
  return data;
};
