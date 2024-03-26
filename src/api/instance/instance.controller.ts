import { Controller, Get, Param, Query } from '@nestjs/common';
import { InstanceService } from './instance.service';

@Controller('instance')
export class InstanceController {
  constructor(private readonly instanceService: InstanceService) {}

  @Get('create')
  async create(@Query('key') key: string) {
    const instanceKey = await this.instanceService.create(key);
    return instanceKey;
  }

  @Get('qrbase64/:key')
  async qrBase64(@Param('key') key: string) {
    const qr = await this.instanceService.qrBase64(key);
    return { qr };
  }

  @Get('info/:key')
  async info(@Param('key') key: string) {
    const info = await this.instanceService.info(key);
    return info;
  }

  @Get('logout/:key')
  async logout(@Param('key') key: string) {
    await this.instanceService.logout(key);
    return true;
  }

  // @Get('delete/:key')
  // async delete(@Param('key') key: string) {
  //   await this.instanceService.delete(key);
  //   return true;
  // }

  @Get('list')
  async list(@Query('active') active: string) {
    const instances = await this.instanceService.list(active);
    return instances;
  }
}
