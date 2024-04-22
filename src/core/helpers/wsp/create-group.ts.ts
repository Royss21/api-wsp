import { WspInstance } from 'src/core/wsp-instance/wsp-app-instance';

export const createGroup = async (
  instance: WspInstance,
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
