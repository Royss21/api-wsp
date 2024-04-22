import { NotFoundException } from '@nestjs/common';
import { Connection } from 'mongoose';
import { WspAppInstance } from 'src/core/wsp-instance';
import { WspGlobalInstance } from 'src/core/wsp-instance/wsp-global-instance';

export const restoreInstanceByKey = async (
  key: string,
  connection: Connection,
) => {
  const result = await connection.listCollections();
  const collection = result.find((c) => c.name === `instance_${key}`);

  if (!collection)
    throw new NotFoundException(
      'No se ha encontrado la instancia en el servidor.',
    );

  if (WspAppInstance[key]) delete WspAppInstance[key];

  const instance = new WspAppInstance(connection, key);
  await instance.init();
  WspGlobalInstance[key] = instance;

  return key;
};
