import { IWhatsApp } from 'src/core/whatsapp/interfaces';
import { WspGlobalInstance } from 'src/core/whatsapp/whatsapp-global';

export const getInstance = (key: string): IWhatsApp => WspGlobalInstance[key];
