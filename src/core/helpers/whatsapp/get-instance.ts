import { WspGlobalInstance } from 'src/core/whatsapp/whatsapp-global';

export const getInstance = (key: string) => WspGlobalInstance[key];
