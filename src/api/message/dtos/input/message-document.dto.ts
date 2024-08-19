import { IsOptional, IsString, MinLength } from 'class-validator';
import { MessageDto } from './message.dto';

export class MessageDocumentDto extends MessageDto {
  @IsString()
  @MinLength(2)
  @IsOptional()
  fileName: string;
}
