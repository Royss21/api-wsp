import { BadRequestException } from '@nestjs/common';
import { Channel } from '../entities/channel.entity';

export const validateName = async (channels: Channel[], name: string) => {
  if (channels.some((s) => s.name === name))
    throw new BadRequestException('El nombre del canal ya existe.');

  return true;
};
