import { WhatsAppInstance } from 'src/core/whatsapp/whatsapp-instance';

export const verifyId = async (instance: WhatsAppInstance, id: string) => {
  if (id.includes('@g.us')) return true;
  const [result] = await instance.sock?.onWhatsApp(id);
  if (result?.exists) return true;
  throw new Error('no account exists');
};
