import { Injectable } from '@nestjs/common';

import { getInstance } from 'src/core/helpers/whatsapp';

import {
  MessageBulkDto,
  MessageDocumentDto,
  MessageDto,
  MessageImageDto,
} from './dtos';
import { generateRandomSecondsBetween, messageDelay } from './helpers';

@Injectable()
export class MessageService {
  async sendMessageBulk(key: string, bulkMessage: MessageBulkDto) {
    const { minSeconds, maxSeconds, messages } = bulkMessage;
    const messageError = [];
    const instance = getInstance(key);

    for (const [index, message] of messages.entries()) {
      const { phoneNumber, textMessage } = message;

      try {
        await instance.sendTextMessage(phoneNumber, textMessage);

        if (index + 1 < messages.length)
          await messageDelay(
            generateRandomSecondsBetween(minSeconds, maxSeconds),
          );
      } catch (error) {
        messageError.push({
          phoneNumber,
          error,
        });
      }
    }

    return messageError;
  }

  async sendTextMessage(key: string, message: MessageDto) {
    const { phoneNumber, textMessage } = message;
    const responseWsp = await getInstance(key).sendTextMessage(
      phoneNumber,
      textMessage,
    );

    return responseWsp;
  }

  async sendImageMessage(key: string, file: any, messageImage: MessageImageDto) {
    const { phoneNumber, caption, textMessage } = messageImage;
    console.log({ phoneNumber, file, caption, textMessage });
    const responseWsp = await getInstance(key).sendMediaMessage(
      phoneNumber,
      file,
      'image',
      caption,
      textMessage,
    );

    return responseWsp;
  }

  async sendDocumentMessage(key: string, file: any, message: MessageDocumentDto) {
    const { phoneNumber, fileName, caption, textMessage } = message;
    const responseWsp = await getInstance(key).sendMediaMessage(
      phoneNumber,
      file,
      'document',
      caption,
      textMessage,
      fileName,
    );

    return responseWsp;
  }
}
