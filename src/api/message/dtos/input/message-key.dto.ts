import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class MessageKeyDto {
  @IsString()
  @Type(() => String)
  remoteJid: string;

  @IsString()
  @Type(() => String)
  id: string;
}
