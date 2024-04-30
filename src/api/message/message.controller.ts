import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { CustomUploadFile } from './decorator';
import {
  MessageAudioDto,
  MessageBulkDto,
  MessageDocumentDto,
  MessageImageDto,
  MessageMediaUrlDto,
  MessageVideoDto,
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
    @CustomUploadFile(5, 'image/(png|jpg|jpeg|gif)')
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
    @CustomUploadFile(50, 'application/*') file: Array<Express.Multer.File>,
    @Body() messageDocumentDto: MessageDocumentDto,
  ) {
    const data = await this.messageService.sendDocument(
      key,
      file[0],
      messageDocumentDto,
    );
    return { data };
  }

  @Post(':key/send-video')
  @UseInterceptors(FilesInterceptor('file'))
  async sendVideo(
    @Param('key') key: string,
    @CustomUploadFile(200, 'video/mp4') file: Array<Express.Multer.File>,
    @Body() messageVideoDto: MessageVideoDto,
  ) {
    const data = await this.messageService.sendVideo(
      key,
      file[0],
      messageVideoDto,
    );
    return { data };
  }

  @Post(':key/send-audio')
  @UseInterceptors(FilesInterceptor('file'))
  async sendAudio(
    @Param('key') key: string,
    @CustomUploadFile(100, 'audio/mpeg') file: Array<Express.Multer.File>,
    @Body() messageAudioDto: MessageAudioDto,
  ) {
    const data = await this.messageService.sendAudio(
      key,
      file[0],
      messageAudioDto,
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
