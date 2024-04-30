import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { CustomUploadFile } from './decorator';
import {
  MessageBulkDto,
  MessageDocumentDto,
  MessageImageDto,
  MessageMediaUrlDto,
} from './dtos';
import { MessageDto } from './dtos/message.dto';
import { MessageService } from './message.service';

@ApiTags('Messages')
@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // @ApiConsumes('multipart/form-data')
  @Post(':key/send-bulk')
  async sendBulk(
    @Param('key') key: string,
    @Body() messageBulkTwo: MessageBulkDto,
  ) {
    const data = await this.messageService.sendBulk(key, messageBulkTwo);
    return { data };
  }

  @Post(':key/send-text')
  async sendText(@Param('key') key: string, @Body() messageDto: MessageDto) {
    const data = await this.messageService.sendText(key, messageDto);
    return { data };
  }

  @Post(':key/send-image')
  @UseInterceptors(FilesInterceptor('file'))
  async sendImage(
    @Param('key') key: string,
    @CustomUploadFile(5, 'image/*')
    file: Array<Express.Multer.File>,
    @Body() messageImageDto: MessageImageDto,
  ) {
    const data = await this.messageService.sendImage(
      key,
      file[0],
      messageImageDto,
    );

    return { data };
  }

  @Post(':key/send-document')
  @UseInterceptors(FilesInterceptor('file'))
  async sendDocument(
    @Param('key') key: string,
    @CustomUploadFile(50, '') file: Array<Express.Multer.File>,
    @Body() messageDocumentDto: MessageDocumentDto,
  ) {
    const data = await this.messageService.sendDocument(
      key,
      file[0],
      messageDocumentDto,
    );
    return { data };
  }

  @Post(':key/send-media-url')
  async sendMediaUrl(
    @Param('key') key: string,
    @Body() messageMediaUrl: MessageMediaUrlDto,
  ) {
    const data = await this.messageService.sendMediaUrl(key, messageMediaUrl);
    return { data };
  }
}
