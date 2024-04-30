import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { MessageDto } from './message.dto';
import { ApiProperty } from '@nestjs/swagger';
import { MessageType } from '@adiwajshing/baileys';
import { TypeMessageList } from '../enums';

export class MessageMediaUrlDto extends MessageDto {
  
  @ApiProperty()
  @IsString()
  @MinLength(2)
  url: string;

  @ApiProperty()
  @IsString()
  @IsEnum(TypeMessageList, {
    message: `Valid values are ${TypeMessageList}`,
  })
  type: MessageType;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  mimetype: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @IsOptional()
  fileName?: string;
}
