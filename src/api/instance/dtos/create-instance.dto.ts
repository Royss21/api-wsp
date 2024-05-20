import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateInstanceDto {
  @ApiProperty()
  @IsString()
  @Type(() => String)
  key: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  webhookUrl?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  connectionRetry?: number;
}
