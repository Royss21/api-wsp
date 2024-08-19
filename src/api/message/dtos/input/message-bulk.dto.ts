import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { MessageType } from '../../../../common/enums/message-type.enum';
import { MimeTypeImageList } from 'src/common/enums';

export class MessageBulkDto {
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  minSeconds: number;

  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  maxSeconds: number;

  @IsArray()
  @Type(() => MessageFileDto)
  files: MessageFileDto[];

  @IsArray()
  @Type(() => MessageContactDto)
  contacts: MessageContactDto[];
}

export class MessageFileDto {
  @IsString()
  key: string;

  @IsString()
  @IsEnum([MessageType.IMAGE], {
    message: `Valid values are ${[MessageType.IMAGE]}`,
  })
  type: MessageType;

  @IsString()
  @IsEnum(MimeTypeImageList.map((m) => `image/${m}`), {
    message: `Valid values are ${MimeTypeImageList.map((m) => `image/${m}`)}`,
  })
  mimetype: string;

  @IsString()
  fileUrl: string;
}

export class MessageContactDto {
  @IsString()
  phoneNumber: string;

  @IsArray()
  @Type(() => MessageContentDto)
  messages: MessageContentDto[];
}

export class MessageContentDto {
  @IsString()
  @IsOptional()
  fileKey: string;

  @IsString()
  textMessage: string;
}
