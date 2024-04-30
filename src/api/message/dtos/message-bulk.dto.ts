import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

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
  type: string;

  @ApiProperty()
  @IsString()
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
