import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/base/base.entity';

export class Channel extends BaseEntity {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: false,
    default: '',
  })
  phoneNumber: string;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
