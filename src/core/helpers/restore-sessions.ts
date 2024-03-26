import { Connection } from "mongoose"
import { WspAppInstance } from "src/classes"
import { WspGlobalInstance } from "src/classes/wsp-global-instance"

export const restoreSessions = async (connection: Connection) => {
    let restoredSessions = new Array()
    let allCollections = []
    try {

        const result = await connection.listCollections();
        result.forEach((collection) => {
            allCollections.push(collection.name)
        })

        for (const key of allCollections) {
            const instances = await connection
                .collection(key)
                .find({})
                .toArray();
            console.log({instances});

            // for (const item of instances) {
            //     console.log({item});
            // }
            const instance = new WspAppInstance(connection, key);
            await instance.init()
            WspGlobalInstance[key] = instance

            restoredSessions.push(key);
        }
    } catch (e) {
        console.error('Error restoring sessions')
        console.error(e)
    }
    return restoredSessions
}