import { Controller, Get, Query } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { WspAppInstance, WspGlobalInstance } from 'src/classes';
import { Config as config } from '../../core/config/config';
import { InstanceService } from './instance.service';

@Controller('instance')
export class InstanceController {
  constructor(
    @InjectConnection() private connection: Connection,
    private readonly instanceService: InstanceService,
  ) {}

  @Get('create')
  async create(@Query('key') key: string) {
    const data = new WspAppInstance(this.connection, key);
    const instance = await data.init();

    WspGlobalInstance[data.key] = instance;

    return {
      error: false,
      message: 'Initializing successfully',
      key: data.key,
      // webhook: {
      //     enabled: data.webhook,
      //     webhookUrl: data.we,
      // },
      qrcode: {
        qrString: '',
      },
      browser: config.browser,
    };
  }

  @Get('qr')
  async qr(@Query('key') key: string) {
    const qr = WspGlobalInstance[key].instance.qr;
    return { qr };
  }
}
