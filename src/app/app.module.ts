import {
  Module,
  NestModule,
  MiddlewareConsumer,
  BeforeApplicationShutdown,
} from '@nestjs/common';
import * as hpp from 'hpp';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { Connection } from 'mongoose';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { RedisModule, RedisService } from '@liaoliaots/nestjs-redis';

import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { AppController } from './app.controller';
import { UserModule } from '../user/user.module';
import { AppConfigModule } from '../common/config/app-config.module';
import { AppConfigService } from '../common/config/app-config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
        uri: config.mongodbUri,
      }),
    }),
    RedisModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
        config: {
          url: config.redisUri,
          enableReadyCheck: true,
        },
      }),
    }),
    AuthModule,
    UserModule,
    AppConfigModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule implements NestModule, BeforeApplicationShutdown {
  constructor(
    private readonly redisService: RedisService,
    private readonly appConfigService: AppConfigService,
    @InjectConnection() private readonly mongoConnecton: Connection,
  ) {}
  configure(consumer: MiddlewareConsumer) {
    const isProduction = this.appConfigService.isProduction;
    consumer
      .apply(hpp(), helmet(), morgan(`${isProduction ? 'combined' : 'dev'}`))
      .forRoutes('*');
  }

  async beforeApplicationShutdown(signal?: string) {
    /* Gracefully close the MongoDB connection */
    const mongoConn = this.mongoConnecton.name;
    console.info(`Closing MongoDB connection ${mongoConn} on ${signal}`);
    await this.mongoConnecton.close();
    console.info(`MongoDB connection ${mongoConn} closed`);

    /* Gracefully close the Redis connection */
    const redisConn = this.redisService.getOrNil();
    console.info(`Closing Redis connection on ${signal}`);
    redisConn.disconnect(false);
    console.info(`Redis connection closed`);
  }
}
