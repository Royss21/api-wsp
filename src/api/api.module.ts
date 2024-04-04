import { Module } from '@nestjs/common';
import { InstanceModule } from './instance/instance.module';
import { MessageModule } from './message/message.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [InstanceModule, MessageModule, ContactModule]
})
export class ApiModule {}
