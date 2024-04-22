import { WspInstance } from 'src/core/wsp-instance/wsp-app-instance';
import { getWhatsAppId, parseParticipants } from '.';

export const makeAdmin = async (
  instance: WspInstance,
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
