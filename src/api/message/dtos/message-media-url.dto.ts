import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { MessageType } from '../enums/message-type.enum';
import { MessageDto } from './message.dto';
import { MimeTypeImageList } from '../enums';

export class MessageMediaUrlDto extends MessageDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  url: string;

  @ApiProperty()
  @IsString()
  // @IsEnum([MessageType.IMAGE], {
  //   message: `Valid values are ${[MessageType.IMAGE]}`,
  // })
  type: MessageType;

  @ApiProperty()
  @IsString()
  // @IsEnum(MimeTypeImageList, {
  //   message: `Valid values are ${MimeTypeImageList}`,
  // })
  mimetype: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @IsOptional()
  fileName?: string;
}
