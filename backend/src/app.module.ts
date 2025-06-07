import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilesModule } from './files/files.module';
import { MessagesModule } from './messages/messages.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { QuickButtonsModule } from './quick-buttons/quick-buttons.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    FilesModule,
    MessagesModule,
    AuthModule,
    QuickButtonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
