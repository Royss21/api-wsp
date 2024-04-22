import { WspInstance } from 'src/core/wsp-instance/wsp-app-instance';
import { getWhatsAppId, verifyId } from '.';

export const sendUrlMediaFile = async (
  instance: WspInstance,
  to: string,
  url: string,
  type: string,
  mimeType: string,
  caption?: string,
) => {
  await verifyId(instance, getWhatsAppId(to));
  const data = await instance.sock?.sendMessage(getWhatsAppId(to), {
    [type]: {
      url: url,
    },
    caption: caption || '',
    mimetype: mimeType,
  });

  return data;
};
