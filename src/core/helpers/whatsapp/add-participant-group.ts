import { WhatsAppInstance } from 'src/core/whatsapp/whatsapp-instance';
import { getWhatsAppId, parseParticipants } from '.';


export const addParticipantGroup = async (
  instance: WhatsAppInstance,
  id: string,
  users: string[],
) => {
  const res = await instance.sock?.groupAdd(
    getWhatsAppId(id),
    parseParticipants(users),
  );
  return res;
};
