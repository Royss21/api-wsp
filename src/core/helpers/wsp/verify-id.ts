import { WspInstance } from "src/core/wsp-instance/wsp-app-instance";

export const verifyId = async (instance: WspInstance, id: string) => {

    if (id.includes('@g.us')) return true;
    const [result] = await instance.sock?.onWhatsApp(id);
    if (result?.exists) return true;
    throw new Error('no account exists');
}