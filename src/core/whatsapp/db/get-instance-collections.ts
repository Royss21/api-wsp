import { Connection } from 'mongoose';

export const getInstanceCollections = async (
  connection: Connection,
  schema: string,
) => {
  const result = await connection.listCollections();
  const collections = result.filter((c) => c.name.startsWith(schema));

  return collections;
};
