import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { FilesInterceptor } from '@nestjs/platform-express';
import { MessageBulkDto, MessageDocumentDto, MessageImageDto } from './dtos';
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
  @UseInterceptors(FilesInterceptor('file'))
  async sendImageMessage(
    @Param('key') key: string,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1000000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Array<Express.Multer.File>,
    @Body() messageImageDto: MessageImageDto,
  ) {
    if (file.length > 1) throw new BadRequestException('Attach only one image');
    const data = await this.messageService.sendImageMessage(
      key,
      file[0],
      messageImageDto,
    );

    return { data };
  }

  @Post(':key/send-document')
  @UseInterceptors(FilesInterceptor('file'))
  async sendDocumentMessage(
    @Param('key') key: string,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 50 * 1000000 }),
          new FileTypeValidator({ fileType: /^(?!.*\.(jpg|jpeg|png|gif|bmp|svg)$).*$/ }),
        ],
      }),
    )
    file: Array<Express.Multer.File>,
    @Body() messageDocumentDto: MessageDocumentDto,
  ) {
    const data = await this.messageService.sendDocumentMessage(
      key,
      file[0],
      messageDocumentDto,
    );
    return { data };
  }
}
