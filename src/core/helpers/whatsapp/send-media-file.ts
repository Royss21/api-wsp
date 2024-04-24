import { WhatsAppInstance } from 'src/core/whatsapp/whatsapp-instance';
import { getWhatsAppId, verifyId } from '.';

export const sendMediaFile = async (
  instance: WhatsAppInstance,
  to: string,
  file: any,
  type: string,
  filename?: string,
  caption?: string,
) => {
  await verifyId(instance, getWhatsAppId(to));
  const data = await instance.sock?.sendMessage(getWhatsAppId(to), {
    mimetype: file.mimetype,
    [type]: file.buffer,
    caption: caption || '',
    ptt: type === 'audio',
    fileName: filename || file.originalname || 'file-name',
  });
  return data;
};
