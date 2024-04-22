import { NotFoundException } from '@nestjs/common';
import { Connection } from 'mongoose';
import { WspAppInstance } from 'src/core/wsp-instance';
import { WspGlobalInstance } from 'src/core/wsp-instance/wsp-global-instance';

export const restoreInstances = async (connection: Connection) => {
  const restoredSessions = new Array();
  const instanceCollections = [];

  const result = await connection.listCollections();
  const collections = result.filter((c) => c.name.includes('instance'));

  if (!collections || collections.length <= 0)
    throw new NotFoundException(
      'No se ha encontrado ninguna instancia en el servidor.',
    );

  if (Object.keys(WspGlobalInstance).length > 0)
    Object.keys(WspGlobalInstance).forEach((key) => delete WspAppInstance[key]);

  for (const collection of collections) {
    instanceCollections.push(collection.name);
  }

  for (const key of instanceCollections) {
    const instance = new WspAppInstance(connection, key);
    await instance.init();
    WspGlobalInstance[key] = instance;
    restoredSessions.push(key);
  }

  return restoredSessions;
};
