import { NotFoundException } from '@nestjs/common';
import { Connection } from 'mongoose';
import { envs } from 'src/core/config';
import { WhatsApp } from 'src/core/whatsapp/whatsapp';
import { WspGlobalInstance } from 'src/core/whatsapp/whatsapp-global';

export const restoreInstanceByKey = async (
  key: string,
  connection: Connection,
): Promise<string> => {
  const result = await connection.listCollections();
  const collection = result.find((c) =>
    c.name.startsWith(envs.instance_name_schema),
  );

  if (!collection)
    throw new NotFoundException(
      'No se ha encontrado la instancia en el servidor.',
    );

  if (WspGlobalInstance[key]) delete WspGlobalInstance[key];

  const instance = new WhatsApp(connection, { key });
  await instance.init();
  WspGlobalInstance[key] = instance;

  return key;
};
