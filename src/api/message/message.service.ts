import { Injectable } from '@nestjs/common';

import { getInstance } from 'src/core/helpers/whatsapp';

import {
  MessageBulkDto,
  MessageDocumentDto,
  MessageDto,
  MessageFileDto,
  MessageImageDto,
  MessageMediaUrlDto,
} from './dtos';
import { generateRandomSecondsBetween, messageDelay } from './helpers';

@Injectable()
export class MessageService {
  async sendBulk(key: string, bulkMessage: MessageBulkDto) {
    const { minSeconds, maxSeconds, files, contacts } = bulkMessage;
    const messageError = [];
    const instance = getInstance(key);
    const filesIndex = files.reduce(
      (acc, el) => ({ [el.key]: el, ...acc }),
      {},
    );

    for (const [index, contact] of contacts.entries()) {
      const { phoneNumber, messages } = contact;

      for (const message of messages) {
        try {
          const { fileKey, textMessage } = message;
          const file = filesIndex[fileKey];
          if (file) {
            const { fileUrl, type, mimetype } = file as MessageFileDto;
            await instance.sendMediaUrl(
              phoneNumber,
              fileUrl,
              type,
              mimetype,
              textMessage,
            );
          } else await instance.sendText(phoneNumber, textMessage);
        } catch (error) {
          messageError.push({
            phoneNumber,
            error,
          });
        }
      }

      if (index + 1 < contacts.length)
        await messageDelay(
          generateRandomSecondsBetween(minSeconds, maxSeconds),
        );
    }

    return messageError;
  }

  async sendText(key: string, message: MessageDto) {
    const { phoneNumber, textMessage } = message;
    const responseWsp = await getInstance(key).sendText(
      phoneNumber,
      textMessage,
    );

    return responseWsp;
  }

  async sendImage(key: string, file: any, messageImage: MessageImageDto) {
    const { phoneNumber, textMessage } = messageImage;
    const responseWsp = await getInstance(key).sendMedia(
      phoneNumber,
      file,
      'image',
      textMessage,
    );

    return responseWsp;
  }

  async sendDocument(key: string, file: any, message: MessageDocumentDto) {
    const { phoneNumber, fileName, textMessage } = message;
    const responseWsp = await getInstance(key).sendMedia(
      phoneNumber,
      file,
      'document',
      textMessage,
      fileName,
    );

    return responseWsp;
  }

  async sendMediaUrl(key: string, message: MessageMediaUrlDto) {
    const { phoneNumber, url, type, mimetype, textMessage } = message;
    const responseWsp = await getInstance(key).sendMediaUrl(
      phoneNumber,
      url,
      type,
      mimetype,
      textMessage,
    );

    return responseWsp;
  }
}
