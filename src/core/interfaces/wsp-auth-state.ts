import { UpdateResult } from "mongodb";

export interface IWspAuthState {
    state: {
        creds: any;
        keys: {
            get: (type: any, ids: any) => Promise<void>;
            set: (data: any) => Promise<void>;
        };
    },
    saveCreds: () => Promise<Document | UpdateResult<Document>>
}