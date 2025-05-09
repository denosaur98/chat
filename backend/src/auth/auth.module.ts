import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaClient } from 'generated/prisma';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: PrismaClient,
      useClass: PrismaClient,
    },
  ],
})
export class AuthModule {}
