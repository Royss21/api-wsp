import { IsString } from 'class-validator';

export class SchemaDto {
  @IsString()
  schema: string;
}
