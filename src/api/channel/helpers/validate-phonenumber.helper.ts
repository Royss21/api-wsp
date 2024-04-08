import { BadRequestException } from '@nestjs/common';
import { Channel } from '../entities/channel.entity';

export const validatePhoneNumber = async (
  channels: Channel[],
  phoneNumber: string,
) => {
  if (channels.some((s) => s.phoneNumber === phoneNumber))
    throw new BadRequestException(
      'El numero de celular ya esta vinculado a otro canal.',
    );

  return true;
};
