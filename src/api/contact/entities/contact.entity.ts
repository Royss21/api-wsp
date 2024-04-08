import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/common/base/base.entity';
import { CustomField } from '../types/custom-field.type';

@Schema()
export class Contact extends BaseEntity{
  @Prop({
    type: String,
    required: true
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  phoneNumber: string;

  @Prop({
    type: String,
    required: true,
  })
  assignedUser: string;

  @Prop({
    type: [CustomField],
    required: true,
    default: []
  })
  customFields: CustomField[]

  @Prop({
    type: String,
    required: false
  })
  avatarUrl?: string;

  @Prop({
    type: String,
    required: false
  })
  email?: string;

  @Prop({
    type: Date,
    required: true,
    default: new Date()
  })
  activationDate: Date;

  @Prop({
    type: String,
    required: false,
    default: ''
  })
  note: string;

  @Prop({
    type: [String],
    required: false,
    default: []
  })
  tags: string[];

  @Prop({
    type: Boolean,
    default: false
  })
  isBlocked: boolean;

  team: any;
  channel: any;

}

export const ContactSchema = SchemaFactory.createForClass(Contact);
