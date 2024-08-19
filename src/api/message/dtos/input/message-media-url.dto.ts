import { IsOptional, IsString, MinLength } from 'class-validator';
import { MessageType } from '../../../../common/enums/message-type.enum';
import { MessageDto } from './message.dto';

export class MessageMediaUrlDto extends MessageDto {
  @IsString()
  @MinLength(2)
  url: string;

  @IsString()
  // @IsEnum([MessageType.IMAGE], {
  //   message: `Valid values are ${[MessageType.IMAGE]}`,
  // })
  type: MessageType;

  @IsString()
  // @IsEnum(MimeTypeImageList, {
  //   message: `Valid values are ${MimeTypeImageList}`,
  // })
  mimetype: string;

  @IsString()
  @MinLength(2)
  @IsOptional()
  fileName?: string;
}
