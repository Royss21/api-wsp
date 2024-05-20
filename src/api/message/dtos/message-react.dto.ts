import { ApiProperty } from '@nestjs/swagger';
import { MessageKeyDto } from './message-key.dto';
import { MessageDto } from './message.dto';
import { Type } from 'class-transformer';
import { IsObject } from 'class-validator';

export class MessageReactDto extends MessageDto {
  @ApiProperty()
  @IsObject()
  @Type(() => MessageKeyDto)
  messageKey: MessageKeyDto;
}
