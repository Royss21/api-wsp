import { getWhatsAppId, parseParticipants } from './';
import { WspInstance } from 'src/core/wsp-instance';

export const addParticipantGroup = async (
  instance: WspInstance,
  id: string,
  users: string[],
) => {
  const res = await instance.sock?.groupAdd(
    getWhatsAppId(id),
    parseParticipants(users),
  );
  return res;
};
