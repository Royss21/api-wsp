import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { getInstanceCollections } from 'src/core/helpers/db';
import {
  getInstanceDetail,
  restoreInstanceByKey,
  restoreInstances,
} from 'src/core/helpers/whatsapp';
import { WhatsApp } from 'src/core/whatsapp/whatsapp';
import { WspGlobalInstance } from 'src/core/whatsapp/whatsapp-global';
import { CreateInstanceDto } from './dtos';
import { envs } from 'src/core/config';

@Injectable()
export class InstanceService {
  constructor(
    @InjectConnection(envs.mongo_instance_dbname)
    private readonly connectionInstance: Connection,
  ) { }

  async create(instanceDto: CreateInstanceDto): Promise<string> {
    const { key } = instanceDto;
    const instanceCollections = await getInstanceCollections(
      this.connectionInstance,
    );
    if (instanceCollections.some((collection) => collection.name === key))
      throw new BadRequestException(
        `Ya existe una instancia con la key ${key}`,
      );

    const data = new WhatsApp(this.connectionInstance, instanceDto);
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
      console.log('info', { error });
      return {};
    }
  }

  async restoreInstances(): Promise<any> {
    try {
      const instances = await restoreInstances(this.connectionInstance);
      return instances;
    } catch (error) {
      console.log('restoreInstances', { error });
    }
  }

  async restoreByKey(key: string): Promise<any> {
    try {
      const instance = await restoreInstanceByKey(key, this.connectionInstance);
      return instance;
    } catch (error) {
      console.log('restoreInstances', { error });
    }
  }

  async logout(key: string): Promise<void> {
    try {
      if (!WspGlobalInstance[key])
        throw new NotFoundException(
          `No existe una instancia en memoria con la key ${key}`,
        );

      const { key: instancekey } = WspGlobalInstance[key] as WhatsApp;
      await WspGlobalInstance[instancekey].instance?.sock?.logout();
      delete WspGlobalInstance[instancekey];
      await this.connectionInstance.dropCollection(instancekey);
    } catch (error) {
      console.log('logout', { error });
    }
  }

  async getAll() {
    const collestionsBd = await getInstanceCollections(this.connectionInstance);
    const instanceDb = collestionsBd.map((c) => c.name);
    const instanceKeys = Object.keys(WspGlobalInstance);
    const instanceMemory = [];
    for (const key of instanceKeys) {
      const whatsapp = WspGlobalInstance[key] as WhatsApp;
      const detail = await getInstanceDetail(whatsapp.instance);
      instanceMemory.push({ [key]: detail });
    }

    return {
      ok: true,
      message: 'All instance listed',
      instanceDb,
      instanceMemory,
    };
  }
}
