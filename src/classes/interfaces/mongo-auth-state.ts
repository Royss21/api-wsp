import { UpdateResult } from "mongodb";

export interface IMongoAuthState {
    state: {
        creds: any;
        keys: {
            get: (type: any, ids: any) => Promise<void>;
            set: (data: any) => Promise<void>;
        };
    },
    saveCreds: () => Promise<Document | UpdateResult<Document>>
}