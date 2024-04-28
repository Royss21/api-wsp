import { Module } from '@nestjs/common';
import { InstanceModule } from './instance/instance.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [InstanceModule, MessageModule],
  exports: [InstanceModule, MessageModule],
})
export class ApiModule {}
