import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get mongodbUri(): string {
    return this.configService.get<string>('MONGODB_URI');
  }

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }
  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  get port(): number {
    return this.configService.get<number>('PORT') || 3000;
  }

  get redisUri() {
    return this.configService.get<string>('REDIS_URI');
  }
}
