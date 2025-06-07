import { Injectable } from '@nestjs/common';

@Injectable()
export class QuickButtonsService {
  private readonly buttonsMap = {
    telegram: [
      {
        id: 1,
        text: 'Заказать медиаплан',
        responseText: `Ваш медиаплан будет готов ${this.getFormattedDate(24)}.`,
      },
      {
        id: 2,
        text: 'Получить отчёт',
        responseText: `Ваш отчёт будет готов ${this.getFormattedDate(24)}.`,
      },
    ],
    whatsapp: [
      {
        id: 2,
        text: 'Статистика',
        responseText: `Ваша статистика будет готова ${this.getFormattedDate(24)}.`,
      },
      {
        id: 3,
        text: 'Консультация',
        responseText: `Вы записаны на консультацию ${this.getFormattedDate(0)}.`,
      },
    ],
    vk: [
      {
        id: 2,
        text: 'Баланс',
        responseText: `Информация по балансу будет доступна ${this.getFormattedDate(24)}.`,
      },
      {
        id: 3,
        text: 'Задолженность',
        responseText: `Информация по задолженности будет доступна ${this.getFormattedDate(24)}.`,
      },
    ],
    sms: [
      {
        id: 1,
        text: 'Подписаться',
        responseText: 'Вы подписаны на обновления.',
      },
      {
        id: 3,
        text: 'Отписаться',
        responseText: 'Вы отписались от обновлений.',
      },
    ],
  };

  private getFormattedDate(hoursToAdd: number): string {
    const date = new Date();
    date.setHours(date.getHours() + 3 + hoursToAdd);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  getButtonsByMessenger(messengerType: string) {
    return this.buttonsMap[messengerType]?.map(({ id, text }) => ({ id, text })) || [];
  }

  getButtonResponse(messengerType: string, buttonId: number) {
    const button = this.buttonsMap[messengerType]?.find(b => b.id === buttonId);

    if (!button) {
      return 'Спасибо за обращение!';
    }

    return button.responseText;
  }
}
