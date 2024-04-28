import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MessageBulkDto, MessageImageDto } from './dtos';
import { MessageDto } from './dtos/message.dto';
import { MessageService } from './message.service';

@ApiTags('Messages')
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post(':key/send-bulk')
  async sendMessageBulk(
    @Param('key') key: string,
    @Body() messageBulk: MessageBulkDto,
  ) {
    const data = await this.messageService.sendMessageBulk(key, messageBulk);
    return { data };
  }

  @Post(':key/send-text')
  async sendTextMessage(
    @Param('key') key: string,
    @Body() messageDto: MessageDto,
  ) {
    const data = await this.messageService.sendTextMessage(key, messageDto);
    return { data };
  }

  @Post(':key/send-image')
  async sendImageMessage(
    @Param('key') key: string,
    @Body() messageImageDto: MessageImageDto,
  ) {
    const data = await this.messageService.sendImageMessage(
      key,
      messageImageDto,
    );
    return { data };
  }
}
