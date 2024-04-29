import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { MessageDto } from './message.dto';

export class MessageDocumentDto extends MessageDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @IsOptional()
  caption?: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @IsOptional()
  fileName: string;
}
