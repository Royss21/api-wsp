import { NotFoundException } from '@nestjs/common';
import { Connection } from 'mongoose';
import { WhatsApp } from 'src/core/whatsapp/whatsapp';
import { WspGlobalInstance } from 'src/core/whatsapp/whatsapp-global';

export const restoreInstances = async (
  connection: Connection,
  schema: string,
): Promise<any[]> => {
  const restoredSessions = new Array();
  const instanceCollections = [];

  const result = await connection.listCollections();
  const collections = result.filter((c) => c.name.startsWith(schema));

  if (!collections || collections.length <= 0)
    throw new NotFoundException(
      'No se ha encontrado ninguna instancia en el servidor.',
    );

  if (Object.keys(WspGlobalInstance).length > 0)
    Object.keys(WspGlobalInstance).forEach((key) => {
      const instance = WspGlobalInstance[key].instance;
      instance?.sock?.ev?.removeAllListeners();
      instance?.sock?.ws?.close();
      delete WspGlobalInstance[key];
    });

  for (const collection of collections) {
    instanceCollections.push(collection.name);
  }

  for (const key of instanceCollections) {
    const instance = new WhatsApp(connection, { key });
    await instance.init();
    WspGlobalInstance[key] = instance;
    restoredSessions.push(key);
  }

  return restoredSessions;
};
