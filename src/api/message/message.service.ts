import { Injectable } from '@nestjs/common';
import { WspGlobalInstance } from 'src/core/wsp-instance';
import { MessageDto } from './dtos/message.dto';
// import { dataWsp } from './dtos/data';

function delay(t) {
  return new Promise((resolve) => setTimeout(resolve, t));
}

function generarNumeroAleatorio() {
  return Math.floor(Math.random() * (20000 - 15000 + 1)) + 15000;
}

@Injectable()
export class MessageService {
  async sendBulkMessage(key: string) {
    const dataError = [];
//     for (const item of dataWsp) {
//       try {
//         await WspGlobalInstance[key].sendTextMessage(
//           `51${item.celular}`,
//           `¡Hola! *${((item.sexo || '') + ' ' + item.nombre).trim()}*.
// Le saluda *Kevin Sanchez*, ejecutivo del Atlantic City. 
    
// *¡FELICITACIONES!* 🥳🎁 *Estás a un paso de ganar 2 entradas para el Show de Carlos Álvarez este 18 de abril*. 🎙🎭 *¡Vuelve en grande con un grande del humor!* 😎 Para acceder al premio, solo tienes que ingresar tu tarjeta Atlantic City Club en tu máquina preferida acumular 50 puntos hasta el 15 de abril y listo 💳 ¡Más fácil, imposible! Asegura tus entradas jugando desde hoy que la capacidad es limitada, para mayor información puede comunicarse conmigo a este número o al 998176527, lo esperamos.`,
//         );

//         await delay(generarNumeroAleatorio());
//       } catch (error) {
//         dataError.push(error);
//         console.log('error', { error });
//       }
//     }

    return dataError;
  }

  async sendText(message: MessageDto, key: string) {
    const data = await WspGlobalInstance[key].sendTextMessage(
      message.id,
      message.message,
    );

    return data;
  }

  async sendImage(message: MessageDto, key: string) {
    const data = await WspGlobalInstance[key].sendMediaFile(
      message.id,
      message.file,
      'image',
      message.caption || '',
    );

    return data;
  }

  async sendDocument(message: MessageDto, key: string) {
    const data = await WspGlobalInstance[key].sendMediaFile(
      message.id,
      message.file,
      'document',
      '',
      message.filename || '',
    );

    return data;
  }

  async readMessage(message: MessageDto, key: string) {
    const data = await WspGlobalInstance[key].readMessage(message.msg);

    return data;
  }
}
