import { Body, Controller, Param, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto } from './dtos/message.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post(":key/text")
  async sendText(@Body() messageDto: MessageDto, @Param("key") key: string){
    const data = await this.messageService.sendText(messageDto, key);
    return {data};
  }
}
