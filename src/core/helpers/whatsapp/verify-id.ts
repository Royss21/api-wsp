import { WhatsAppInstance } from 'src/core/whatsapp/whatsapp-instance';

export const verifyId = async (
  instance: WhatsAppInstance,
  id: string,
): Promise<boolean> => {
  if (id.includes('@g.us')) return true;
  const [result] = await instance.sock?.onWhatsApp(id);
  if (result?.exists) return true;
  throw new Error(`The WhatsApp account with number ${id} does not exist`);
};
