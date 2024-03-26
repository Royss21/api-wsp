import { Injectable } from '@nestjs/common';
import { WspGlobalInstance } from 'src/classes';
import { MessageDto } from './dtos/message.dto';

@Injectable()
export class MessageService {

    async sendText(message: MessageDto, key: string) {
        const data = await WspGlobalInstance[key].sendTextMessage(
            message.id,
            message.message
        )

        return data;
    }

    async sendImage(message: MessageDto, key: string) {
        const data = await WspGlobalInstance[key].sendMediaFile(
            message.id,
            message.file,
            'image',
            message.caption || ''
        )

        return data;
    }

    async sendDocument(message: MessageDto, key: string) {
        const data = await WspGlobalInstance[key].sendMediaFile(
            message.id,
            message.file,
            'document',
            '',
            message.filename || ''
        )

        return data;
    }

    async readMessage(message: MessageDto, key: string) {
        const data = await WspGlobalInstance[key].readMessage(
            message.msg
        )

        return data;
    }
}
