import { ConfigModule } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';

import { envSchema } from './env.validation';
import { AppConfigService } from './app-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: false,
      validationSchema: envSchema,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
