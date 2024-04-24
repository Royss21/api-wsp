import { WhatsAppInstance } from 'src/core/whatsapp/whatsapp-instance';

export const createGroup = async (
  instance: WhatsAppInstance,
  name: string,
  users: string[],
) => {
  const group = await instance.sock?.groupCreate(name, [...users]);

  /*groupCreate(
            name,
            ['59167511387:2@s.whatsapp.net']//users?.map(this.getWhatsAppId)
        )*/
  return group;
};
