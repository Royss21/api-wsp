import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { InstanceService } from './instance.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateInstanceDto } from './dtos';

@ApiTags('Instance')
@Controller('instance')
export class InstanceController {
  constructor(private readonly instanceService: InstanceService) {}

  @Post()
  async create(@Body() instanceDto: CreateInstanceDto) {
    const { key } = instanceDto;
    const instanceKey = await this.instanceService.create(key);
    return instanceKey;
  }

  @Get(':key/qrbase64')
  async qrBase64(@Param('key') key: string) {
    const qr = await this.instanceService.qrBase64(key);
    return { qr };
  }

  @Get(':key/info')
  async info(@Param('key') key: string) {
    const info = await this.instanceService.info(key);
    return info;
  }

  @Get(':key/logout')
  async logout(@Param('key') key: string) {
    await this.instanceService.logout(key);
    return true;
  }

  @Get('restore-all')
  async restoreInstances() {
    await this.instanceService.restoreInstances();
    return true;
  }

  @Get(':key/restore')
  async restore(@Param('key') key: string) {
    await this.instanceService.restoreByKey(key);
    return true;
  }

  @Get()
  async list(@Query('active') active: boolean) {
    const instances = await this.instanceService.getAll(active + '' === 'true');
    return instances;
  }
}
