import { Module } from '@nestjs/common';
import { MessageService } from './services/message.service';
import { MessageController } from './controllers/message.controller';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
