import { Connection } from "mongoose";
import { envs } from "src/core/config";

export const getInstanceCollections = async (connection: Connection) => {
    const result = await connection.listCollections();
    const collections = result.filter((c) =>
      c.name.startsWith(envs.instance_name_schema),
    );

    return collections;
}