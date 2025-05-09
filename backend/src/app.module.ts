import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './files/files.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [FilesModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
