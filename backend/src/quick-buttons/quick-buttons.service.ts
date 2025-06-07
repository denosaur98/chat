import { Injectable } from '@nestjs/common';

@Injectable()
export class QuickButtonsService {
  private readonly buttonsMap = {
    telegram: [
      { id: 1, text: 'Заказать медиаплан' },
      { id: 2, text: 'Получить отчёт' },
    ],
    whatsapp: [
      { id: 2, text: 'Статистика' },
      { id: 3, text: 'Консультация' },
    ],
    vk: [
      { id: 2, text: 'Баланс' },
      { id: 3, text: 'Помощь' },
    ],
    sms: [
      { id: 1, text: 'Подписаться' },
      { id: 3, text: 'Отписаться' },
    ],
  };

  getButtonsByMessenger(messengerType: string) {
    return this.buttonsMap[messengerType] || [];
  }
}
