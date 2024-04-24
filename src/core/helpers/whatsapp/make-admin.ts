import { WhatsAppInstance } from 'src/core/whatsapp/whatsapp-instance';
import { getWhatsAppId, parseParticipants } from '.';

export const makeAdmin = async (
  instance: WhatsAppInstance,
  id: string,
  users: string[],
) => {
  try {
    const res = await instance.sock?.groupMakeAdmin(
      getWhatsAppId(id),
      parseParticipants(users),
    );
    return res;
  } catch {
    return {
      error: true,
      message:
        'unable to promote some participants, check if you are admin in group or participants exists',
    };
  }
};
