import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsPositive, IsString } from 'class-validator';

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
    type: () => [MessageContentDto]
  })
  @IsArray()
  @Type(() => MessageContentDto)
  messages: MessageContentDto[];
}

class MessageContentDto {
  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  textMessage: string;
}
