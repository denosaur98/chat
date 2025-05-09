import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  private messages = [
    {
      id: Date.now(),
      username: 'Бот',
      text: 'Добрый день, чем могу помочь?',
      isMine: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: new Date(),
    },
  ];

  findAll() {
    return this.messages;
  }

  create(dto: CreateMessageDto) {
    const newMessage = {
      id: Date.now(),
      username: dto.username ?? 'Гость',
      text: dto.text,
      isMine: dto.isMine !== undefined ? dto.isMine : true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: new Date(),
    };

    return this.messages.push(newMessage);
  }
}
