import { Injectable } from '@nestjs/common';

import { getInstance, sendMediaFile } from 'src/core/helpers/whatsapp';

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
    const instance = getInstance(key);
    // console.log({ instance });
    // const responseWsp = await sendTextMessage(
    //   instance,
    //   phoneNumber,
    //   textMessage,
    // );
    const responseWsp = await getInstance(key).sendTextMessage(
      //instance,
      phoneNumber,
      textMessage,
    );

    return responseWsp;
  }

  async sendImageMessage(key: string, messageImage: MessageImageDto) {
    const { phoneNumber, file, caption, textMessage } = messageImage;
    const instance = getInstance(key);
    const responseWsp = await sendMediaFile(
      instance,
      phoneNumber,
      file,
      'image',
      '',
      caption || textMessage,
    );

    return responseWsp;
  }

  async sendDocumentMessage(message: MessageDocumentDto, key: string) {
    const { phoneNumber, file, fileName, caption, textMessage } = message;
    const instance = getInstance(key);
    const responseWsp = await sendMediaFile(
      instance,
      phoneNumber,
      file,
      'document',
      fileName,
      caption || textMessage,
    );

    return responseWsp;
  }

  // async readMessage(message: MessageDto, key: string) {
  //   const responseWsp = await WspGlobalInstance[key].readMessage(message.msg);
  //   return responseWsp;
  // }
}
