import {
  MessageAudioDto,
  MessageBulkDto,
  MessageDocumentDto,
  MessageDto,
  MessageImageDto,
  MessageMediaUrlDto,
  MessageReactDto,
  MessageVideoDto,
} from '../dtos/input';

export interface IMessageService {
  sendBulk(key: string, bulkMessage: MessageBulkDto);
  sendText(key: string, message: MessageDto);
  sendImage(key: string, file: any, messageImage: MessageImageDto);
  sendDocument(key: string, file: any, message: MessageDocumentDto);
  sendVideo(key: string, file: any, message: MessageVideoDto);
  sendAudio(key: string, file: any, message: MessageAudioDto);
  sendMediaUrl(key: string, message: MessageMediaUrlDto);
  reactMessage(key: string, messageReact: MessageReactDto);
}
