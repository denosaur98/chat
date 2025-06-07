export class GetButtonsDto {
  readonly messengerType: 'telegram' | 'whatsapp' | 'vk' | 'sms';
}

export class ButtonClickDto {
  readonly messengerType: string;
  readonly buttonId: number;
}

export interface ButtonResponse {
  text: string;
  quickReplies?: string[];
}
