import { Module } from '@nestjs/common';
import { ChannelModule } from './channel/channel.module';
import { ContactModule } from './contact/contact.module';
import { InstanceModule } from './instance/instance.module';
import { MessageModule } from './message/message.module';
import { TeamModule } from './team/team.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    InstanceModule,
    MessageModule,
    // ContactModule,
    // ChannelModule,
    // TeamModule,
    // UserModule,
  ],
})
export class ApiModule {}
