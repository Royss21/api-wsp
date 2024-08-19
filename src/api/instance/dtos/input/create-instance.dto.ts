import { Type } from 'class-transformer';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateInstanceDto {
  @IsString()
  @Type(() => String)
  key: string;

  @IsString()
  @MaxLength(10)
  @MinLength(3)
  @Type(() => String)
  whatsaapInstanceName?: number;

  @IsString()
  @MaxLength(5)
  @MinLength(4)
  @Type(() => String)
  schema?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  webhookUrl?: string;
}
