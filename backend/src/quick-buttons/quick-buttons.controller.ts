import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { QuickButtonsService } from './quick-buttons.service';

@Controller('quick-buttons')
export class QuickButtonsController {
  constructor(private readonly buttonsService: QuickButtonsService) {}

  @Get(':messengerType')
  getButtons(@Param('messengerType') messengerType: string) {
    return this.buttonsService.getButtonsByMessenger(messengerType);
  }

  @Post('response')
  handleButtonClick(@Body() body: { messengerType: string; buttonId: number }) {
    return this.buttonsService.getButtonResponse(
      body.messengerType,
      body.buttonId,
    );
  }
}
