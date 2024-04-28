import { IsString, MinLength } from 'class-validator';
import { MessageDto } from './message.dto';

export class MessageImageDto extends MessageDto {
  file?: any;

  @IsString()
  @MinLength(2)
  caption?: string;
}
