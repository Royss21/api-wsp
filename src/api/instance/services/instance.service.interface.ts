import { CreateInstanceDto } from '../dtos/input';

export interface IInstanceService {
  create(instanceDto: CreateInstanceDto): Promise<string>;
  qrBase64(key: string): Promise<string>;
  info(key: string);
  restoreInstances(schema: string): Promise<any>;
  restoreByKey(key: string): Promise<any>;
  logout(key: string): Promise<void>;
  findAll(schema: string);
}
