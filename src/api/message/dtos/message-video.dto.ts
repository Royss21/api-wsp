import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { MessageDto } from './message.dto';

export class MessageVideoDto extends MessageDto {}
