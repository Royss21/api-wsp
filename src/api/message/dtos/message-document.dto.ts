import { IsString, MinLength } from 'class-validator';
import { MessageDto } from './message.dto';

export class MessageDocumentDto extends MessageDto {
  file?: any;

  @IsString()
  @MinLength(2)
  caption?: string;

  @IsString()
  @MinLength(2)
  fileName: string;
}
