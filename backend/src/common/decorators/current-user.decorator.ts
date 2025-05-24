import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const CurrentUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new Error('Недействительный токен');
    }

    const token = authHeader.split(' ')[1];
    const jwtService = new JwtService({
      secret: new ConfigService().get('JWT_SECRET'),
    });

    const payload = await jwtService.verifyAsync(token);
    return { id: payload.id };
  },
);
