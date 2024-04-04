import { Connection } from 'mongoose';
import { WspAppInstance } from 'src/core/wsp-instance';
import { WspGlobalInstance } from 'src/core/wsp-instance/wsp-global-instance';

export const restoreSessions = async (connection: Connection) => {
  let restoredSessions = new Array();
  let allCollections = [];
  try {
    const result = await connection.listCollections();
    result.forEach((collection) => {
      allCollections.push(collection.name);
    });

    for (const key of allCollections) {
      const instances = await connection.collection(key).find({}).toArray();

      const instance = new WspAppInstance(connection, key);
      await instance.init();
      WspGlobalInstance[key] = instance;

      restoredSessions.push(key);
    }
  } catch (e) {
    console.error('Error restoring sessions');
    console.error(e);
  }
  return restoredSessions;
};
