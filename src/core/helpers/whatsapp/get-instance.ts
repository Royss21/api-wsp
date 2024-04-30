import { IWhatsApp } from 'src/core/interfaces/whatsapp.interface';
import { WspGlobalInstance } from 'src/core/whatsapp/whatsapp-global';

export const getInstance = (key: string): IWhatsApp => WspGlobalInstance[key];
