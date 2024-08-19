import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class MessageDto {
  @IsString()
  @Type(() => String)
  phoneNumber: string;

  @IsString()
  @Type(() => String)
  textMessage: string;
}
