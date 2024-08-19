import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import {
  getInstanceDetail,
  restoreInstanceByKey,
  restoreInstances,
} from 'src/core/helpers/whatsapp';
import { getInstanceCollections } from 'src/core/whatsapp/db';
import { WhatsApp } from 'src/core/whatsapp/whatsapp';
import { WspGlobalInstance } from 'src/core/whatsapp/whatsapp-global';
import { CreateInstanceDto } from '../dtos/input';
import { IInstanceService } from './instance.service.interface';

@Injectable()
export class InstanceService implements IInstanceService {
  constructor(
    @InjectConnection()
    private readonly connectionInstance: Connection,
  ) {}

  async create(instanceDto: CreateInstanceDto): Promise<string> {
    const { key, schema } = instanceDto;
    const instanceCollections = await getInstanceCollections(
      this.connectionInstance,
      schema,
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
    return await instance.getInstanceDetail(key);
  }

  async restoreInstances(schema: string): Promise<any> {
    const instances = await restoreInstances(this.connectionInstance, schema);
    return instances;
  }

  async restoreByKey(key: string): Promise<any> {
    const instance = await restoreInstanceByKey(key, this.connectionInstance);
    return instance;
  }

  async logout(key: string): Promise<void> {
    if (!WspGlobalInstance[key])
      throw new NotFoundException(
        `No existe una instancia en memoria con la key ${key}`,
      );

    const { key: instancekey } = WspGlobalInstance[key] as WhatsApp;
    await WspGlobalInstance[instancekey].instance?.sock?.logout();
    delete WspGlobalInstance[instancekey];
    await this.connectionInstance.dropCollection(instancekey);
  }

  async findAll(schema: string) {
    const collestionsBd = await getInstanceCollections(this.connectionInstance, schema);
    const instanceDb = collestionsBd.map((c) => c.name);
    const instanceKeys = Object.keys(WspGlobalInstance);
    const instanceMemory = [];
    for (const key of instanceKeys) {
      const whatsapp = WspGlobalInstance[key] as WhatsApp;
      const detail = getInstanceDetail(whatsapp.instance);
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
