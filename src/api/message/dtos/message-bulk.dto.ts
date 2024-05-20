import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { MessageType } from '../enums/message-type.enum';
import { MimeTypeImageList } from '../enums';

export class MessageBulkDto {
  @ApiProperty()
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  minSeconds: number;

  @ApiProperty()
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  maxSeconds: number;

  @ApiProperty({
    type: () => [MessageFileDto],
  })
  @IsArray()
  @Type(() => MessageFileDto)
  files: MessageFileDto[];

  @ApiProperty({
    type: () => [MessageContactDto],
  })
  @IsArray()
  @Type(() => MessageContactDto)
  contacts: MessageContactDto[];
}

export class MessageFileDto {
  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsString()
  @IsEnum([MessageType.IMAGE], {
    message: `Valid values are ${[MessageType.IMAGE]}`,
  })
  type: MessageType;

  @ApiProperty()
  @IsString()
  @IsEnum(MimeTypeImageList.map((m) => `image/${m}`), {
    message: `Valid values are ${MimeTypeImageList.map((m) => `image/${m}`)}`,
  })
  mimetype: string;

  @ApiProperty()
  fileUrl: string;
}

export class MessageContactDto {
  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    type: () => [MessageContentDto],
  })
  @IsArray()
  @Type(() => MessageContentDto)
  messages: MessageContentDto[];
}

export class MessageContentDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  fileKey: string;

  @ApiProperty()
  @IsString()
  textMessage: string;
}
