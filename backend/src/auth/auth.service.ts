import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { RegisterRequest } from './dto/register.dto';
import { hash } from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly prismaClient: PrismaClient) {}

  async register(dto: RegisterRequest) {
    const { name, email, password } = dto;

    const existUser = await this.prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (existUser) {
      throw new ConflictException('Пользователь с такой почтой уже существует');
    }

    const user = await this.prismaClient.user.create({
      data: {
        name,
        email,
        password: await hash(password),
      },
    });

    return user;
  }
}
