import { WhatsAppInstance } from 'src/core/whatsapp/whatsapp-instance';
import { getWhatsAppId, verifyId } from '.';

export const sendMediaFile = async (
  instance: WhatsAppInstance,
  phoneNumber: string,
  file: any,
  type: string,
  filename?: string,
  caption?: string,
) => {
  const whatsappId = getWhatsAppId(phoneNumber);
  await verifyId(instance, whatsappId);
  const data = await instance.sock?.sendMessage(whatsappId, {
    mimetype: file.mimetype,
    [type]: file.buffer,
    caption: caption || '',
    ptt: type === 'audio',
    fileName: filename || file.originalname || '',
  });

  return data;
};
