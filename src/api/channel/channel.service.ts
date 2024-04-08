import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Channel } from './entities/channel.entity';
import { getIfExistsChannel } from './helpers/get-if-exists-channel.helper';
import { validateName } from './helpers/validate-name.helper';
import { validatePhoneNumber } from './helpers/validate-phonenumber.helper';

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel(Channel.name)
    private readonly channelModel: Model<Channel>,
  ) {}

  async create(createChannelDto: CreateChannelDto) {
    const { name, phoneNumber } = createChannelDto;
    const channels = await this.channelModel.find();

    validateName(channels, name);
    validatePhoneNumber(channels, phoneNumber);

    const channel = await this.channelModel.create(createChannelDto);
    return channel;
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return (
      this.channelModel
        .find()
        .limit(limit)
        .skip(offset)
        // .sort({ _id: 1 })
        .select('-__v')
    );
  }

  async findOne(id: string) {
    const channel = await getIfExistsChannel(this.channelModel, id);
    return channel;
  }

  async update(
    id: string,
    updateChannelDto: UpdateChannelDto,
  ): Promise<boolean> {
    const { name, phoneNumber } = updateChannelDto;

    const channel = await getIfExistsChannel(this.channelModel, id);
    const channels = await this.channelModel.find({ _id: { $ne: id } });

    validateName(channels, name);
    validatePhoneNumber(channels, phoneNumber);

    await channel.updateOne(updateChannelDto, { new: true });

    return true;
  }

  async remove(id: string): Promise<boolean> {
    const { deletedCount } = await this.channelModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`No se encontró el canal`);

    return true;
  }
}
