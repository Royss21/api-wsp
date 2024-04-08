import { NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Channel } from '../entities/channel.entity';

export const getIfExistsChannel = async (
  channelModel: Model<Channel>,
  id: string,
) => {
  const channel = await channelModel.findById(id);
  if (!channel) throw new NotFoundException('No se encontró el canal');
  return channel;
};
