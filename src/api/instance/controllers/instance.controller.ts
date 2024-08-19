import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateInstanceDto, SchemaDto } from '../dtos/input';
import { IInstanceService, InstanceService } from '../services';

@Controller('instances')
export class InstanceController {
  constructor(
    @Inject(InstanceService) private readonly instanceService: IInstanceService,
  ) {}

  @Post()
  async create(@Body() instanceDto: CreateInstanceDto) {
    instanceDto = {
      ...instanceDto,
      key: `${instanceDto.schema}_${instanceDto.key}`,
    };
    const instanceKey = await this.instanceService.create(instanceDto);
    return { key: instanceKey };
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

  @Post(':schema/restore-all')
  async restoreInstances(@Param('schema') schema: string) {
    const instances = await this.instanceService.restoreInstances(schema);
    return instances;
  }

  @Get(':key/restore')
  async restore(@Param('key') key: string) {
    const instance = await this.instanceService.restoreByKey(key);
    return instance;
  }

  @Get(':schema')
  async findAll(@Param('schema') schema: string) {
    const instances = await this.instanceService.findAll(schema);
    return instances;
  }
}
