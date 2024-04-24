import { getWhatsAppId } from '.';

export const parseParticipants = (users: string[]) =>
  users.map((users) => getWhatsAppId(users));
