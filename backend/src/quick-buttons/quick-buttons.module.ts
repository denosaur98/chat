import { Module } from '@nestjs/common';
import { QuickButtonsService } from './quick-buttons.service';
import { QuickButtonsController } from './quick-buttons.controller';

@Module({
  controllers: [QuickButtonsController],
  providers: [QuickButtonsService],
})
export class QuickButtonsModule {}
