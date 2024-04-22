import { UpdateResult } from 'mongodb';

export interface IWhatsAppAuthState {
  state: {
    creds: any;
    keys: {
      get: (type: any, ids: any) => Promise<{}>;
      set: (data: any) => Promise<void>;
    };
  };
  saveCreds: () => Promise<Document | UpdateResult<Document>>;
}
