import { Type } from 'class-transformer';
import { IsObject } from 'class-validator';
import { MessageKeyDto } from './message-key.dto';
import { MessageDto } from './message.dto';

export class MessageReactDto extends MessageDto {
  @IsObject()
  @Type(() => MessageKeyDto)
  messageKey: MessageKeyDto;
}
