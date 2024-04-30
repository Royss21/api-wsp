import { IsString, MinLength } from 'class-validator';
import { MessageDto } from './message.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MessageMediaUrlDto extends MessageDto {
  
  @ApiProperty()
  @IsString()
  @MinLength(2)
  url: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  type: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  mimetype: string;
}
