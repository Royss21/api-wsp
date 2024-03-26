import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { WspAppInstance, WspGlobalInstance } from 'src/classes';
import { restoreSessions } from 'src/core/helpers';

@Injectable()
export class InstanceService {
  constructor(@InjectConnection() private connection: Connection) {}

  async create(key: string): Promise<string> {
    const data = new WspAppInstance(this.connection, key);
    const instance = await data.init();

    WspGlobalInstance[data.key] = instance;

    return key;
  }

  qrBase64(key: string): Promise<string> {
    const qr = WspGlobalInstance[key].instance.qr;
    return qr;
  }

  async info(key: string) {
    const instance = WspGlobalInstance[key];

    try {
      return await instance.getInstanceDetail(key);
    } catch (error) {
      console.log({ error });
      return {};
    }
  }

  async restoreInstances(): Promise<any> {
    try {
      const restoredSessions = await restoreSessions(this.connection);
      return restoredSessions;
    } catch (error) {
      console.log({ error });
    }
  }

  async logout(key: string): Promise<void> {
    try {
      await WspGlobalInstance[key].instance?.sock?.logout();
      delete WspGlobalInstance[key];
    } catch (error) {
      console.log({ error });
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await WspGlobalInstance[key].deleteInstance(key);
    } catch (error) {
      console.log({ error });
    }
  }

  async list(active: boolean) {
    if (active) {
      const result = await this.connection.listCollections();
      return {
        ok: true,
        message: 'All active instance',
        data: result.map((collection) => collection.name),
      };
    }

    const instance = Object.keys(WspGlobalInstance).map(async (key) =>
      WspGlobalInstance[key].getInstanceDetail(key),
    );
    const instances = await Promise.all(instance);

    return {
      ok: true,
      message: 'All instance listed',
      data: instances,
    };
  }
}
