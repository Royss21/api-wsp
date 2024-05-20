import { Module } from '@nestjs/common';
import { InstanceModule } from './instance/instance.module';
import { MessageModule } from './message/message.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [InstanceModule, MessageModule, GroupModule],
  exports: [InstanceModule, MessageModule],
})
export class ApiModule {}
