import { WhatsAppInstance } from 'src/core/whatsapp/whatsapp-instance';
import { verifyId } from './verify-id';

export const getWhatsAppId = async (
  instance: WhatsAppInstance,
  id: string,
): Promise<string> => {
  let whatsAppId = '';
  if (id.includes('@g.us') || id.includes('@s.whatsapp.net')) whatsAppId = id;
  whatsAppId = id.includes('-') ? `${id}@g.us` : `${id}@s.whatsapp.net`;
  await verifyId(instance, whatsAppId);
  return whatsAppId;
};
