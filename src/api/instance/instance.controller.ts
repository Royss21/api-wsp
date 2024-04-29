import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { InstanceService } from './instance.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateInstanceDto } from './dtos';
import { envs } from 'src/core/config';

@ApiTags('Instance')
@Controller('instance')
export class InstanceController {
  constructor(private readonly instanceService: InstanceService) {}

  @Post()
  async create(@Body() instanceDto: CreateInstanceDto) {
    instanceDto = { ...instanceDto, key: `${envs.instance_name_schema}-${instanceDto.key}` }
    const instanceKey = await this.instanceService.create(instanceDto);
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
    const instances = await this.instanceService.restoreInstances();
    return instances;
  }

  @Get(':key/restore')
  async restore(@Param('key') key: string) {
    const instance = await this.instanceService.restoreByKey(key);
    return instance;
  }

  @Get('/get-all')
  async list() {
    const instances = await this.instanceService.getAll();
    return instances;
  }
}
