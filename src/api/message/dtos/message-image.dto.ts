import { IsOptional, IsString, MinLength } from 'class-validator';
import { MessageDto } from './message.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MessageImageDto extends MessageDto {
  @ApiProperty({
    type: String
  })
  @IsString()
  @MinLength(2)
  @IsOptional()
  caption?: string;
}
