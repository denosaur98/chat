import { ConfigService } from '@nestjs/config';

export function isDev(confingService: ConfigService) {
  return confingService.getOrThrow('NODE_ENV') === 'dev';
}
