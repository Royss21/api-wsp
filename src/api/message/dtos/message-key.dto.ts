import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class MessageKeyDto {
  @ApiProperty({
    type: String
  })
  @IsString()
  @Type(() => String)
  remoteJid: string;

  @ApiProperty({
    type: String
  })
  @IsString()
  @Type(() => String)
  id: string;
}
