import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class MessageDto {
  @ApiProperty({
    type: String
  })
  @IsString()
  @Type(() => String)
  phoneNumber: string;

  @ApiProperty({
    type: String
  })
  @IsString()
  @MinLength(2)
  @Type(() => String)
  textMessage: string;
}
