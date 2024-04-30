import { Injectable } from '@nestjs/common';

import { getInstance } from 'src/core/helpers/whatsapp';

import {
  MessageAudioDto,
  MessageBulkDto,
  MessageDocumentDto,
  MessageDto,
  MessageFileDto,
  MessageImageDto,
  MessageMediaUrlDto,
  MessageVideoDto,
} from './dtos';
import { generateRandomSecondsBetween, messageDelay } from './helpers';
import { TypeMessage } from './enums';

@Injectable()
export class MessageService {
  async sendBulk(key: string, bulkMessage: MessageBulkDto) {
    const { minSeconds, maxSeconds, files, contacts } = bulkMessage;
    const messageError = [];
    const messagesSuccess: any[] = [];
    const instance = getInstance(key);
    const filesIndex = files.reduce(
      (acc, el) => ({ [el.key]: el, ...acc }),
      {},
    );

    for (const [index, contact] of contacts.entries()) {
      const { phoneNumber, messages } = contact;

      for (const message of messages) {
        try {
          let response;
          const { fileKey, textMessage } = message;
          const file = filesIndex[fileKey];
          if (file) {
            const { fileUrl, type, mimetype } = file as MessageFileDto;
            response = await instance.sendMediaUrl(
              phoneNumber,
              fileUrl,
              type,
              mimetype,
              textMessage,
            );
          } else {
            response = await instance.sendText(phoneNumber, textMessage);
          }

          messagesSuccess.push(response);
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

    return { messagesSuccess, messageError };
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
      TypeMessage.IMAGE,
      textMessage,
    );

    return responseWsp;
  }

  async sendDocument(key: string, file: any, message: MessageDocumentDto) {
    const { phoneNumber, fileName, textMessage } = message;
    const responseWsp = await getInstance(key).sendMedia(
      phoneNumber,
      file,
      TypeMessage.DOCUMENTO,
      textMessage,
      fileName,
    );

    return responseWsp;
  }

  async sendVideo(key: string, file: any, message: MessageVideoDto) {
    const { phoneNumber, textMessage } = message;
    const responseWsp = await getInstance(key).sendMedia(
      phoneNumber,
      file,
      TypeMessage.VIDEO,
      textMessage,
    );

    return responseWsp;
  }

  async sendAudio(key: string, file: any, message: MessageAudioDto) {
    const { phoneNumber, textMessage } = message;
    const responseWsp = await getInstance(key).sendMedia(
      phoneNumber,
      file,
      TypeMessage.AUDIO,
      textMessage,
    );

    return responseWsp;
  }

  async sendMediaUrl(key: string, message: MessageMediaUrlDto) {
    const { phoneNumber, url, type, fileName, mimetype, textMessage } = message;
    const responseWsp = await getInstance(key).sendMediaUrl(
      phoneNumber,
      url,
      type,
      mimetype,
      fileName,
      textMessage,
    );

    return responseWsp;
  }
}
