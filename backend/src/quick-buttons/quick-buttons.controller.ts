import { Controller, Get, Param } from '@nestjs/common';
import { QuickButtonsService } from './quick-buttons.service';
import { GetButtonsDto } from './dto/get-buttons.dto';
import { ButtonResponseDto } from './dto/button-response.dto';

@Controller('quick-buttons')
export class QuickButtonsController {
  constructor(private readonly quickButtonsService: QuickButtonsService) {}

  @Get(':messengerType')
  getButtons(@Param() params: GetButtonsDto): ButtonResponseDto[] {
    return this.quickButtonsService.getButtonsByMessenger(params.messengerType);
  }
}
