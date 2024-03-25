import { Collection } from "mongoose"
import { proto } from "@adiwajshing/baileys/WAProto";
import { Curve, signedKeyPair } from "@adiwajshing/baileys/lib/Utils/crypto";
import { BufferJSON, generateRegistrationId } from "@adiwajshing/baileys/lib/Utils/generics";
import { randomBytes } from "crypto";

const initAuthCreds = () => {
    const identityKey = Curve.generateKeyPair()
    return {
        noiseKey: Curve.generateKeyPair(),
        signedIdentityKey: identityKey,
        signedPreKey: signedKeyPair(identityKey, 1),
        registrationId: generateRegistrationId(),
        advSecretKey: randomBytes(32).toString('base64'),
        processedHistoryMessages: [],
        nextPreKeyId: 1,
        firstUnuploadedPreKeyId: 1,
        accountSettings: {
            unarchiveChats: false,
        },
    }
}

export const useMongoDBAuthState = async (collection: Collection) => {
    // console.log("colleccion ",collection)
     const writeData = (data, id) => {
         return collection.replaceOne(
             { _id: id },
             JSON.parse(JSON.stringify(data, BufferJSON.replacer)),
             { upsert: true }
         )
     }
     const readData = async (id) => {
         try {
             const data = JSON.stringify(await collection.findOne({ _id: id }))
             return JSON.parse(data, BufferJSON.reviver)
         } catch (error) {
             return null
         }
     }
     const removeData = async (id) => {
         try {
             await collection.deleteOne({ _id: id })
         } catch (_a) {}
     }
     const creds = (await readData('creds')) || (initAuthCreds)()
     
     return {
         state: {
             creds,
             keys: {
                 get: async (type, ids) => {
                     const data = {}
                     await Promise.all(
                         ids.map(async (id) => {
                             let value = await readData(`${type}-${id}`)
                             if (type === 'app-state-sync-key') {
                                 value =
                                     proto.Message.AppStateSyncKeyData.fromObject(data)
                             }
                             data[id] = value
                         })
                     )
                     return data
                 },
                 set: async (data) => {
                     const tasks = []
                     for (const category of Object.keys(data)) {
                         for (const id of Object.keys(data[category])) {
                             const value = data[category][id]
                             const key = `${category}-${id}`
                             tasks.push(
                                 value ? writeData(value, key) : removeData(key)
                             )
                         }
                     }
                     await Promise.all(tasks)
                 },
             },
         },
         saveCreds: () => {
             return writeData(creds, 'creds')
         },
     }
 }
 