import { join } from 'path';
import { Connection } from 'mongoose';
import { readFile } from 'fs/promises';
import { NestFactory } from '@nestjs/core';
import { getConnectionToken } from '@nestjs/mongoose';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

import {
  getDatabaseStatus,
  getRedisStatus,
  getNodeEnvironment,
  getApplicationPort,
  getFormattedConsole,
} from './common/helpers/console.helper';
import { AppModule } from './app/app.module';
import { enableCors } from './common/helpers/cors.helper';
import { AppConfigService } from './common/config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const dbConnection = app.get<Connection>(getConnectionToken());
  const redisClient = app.get(RedisService).getOrNil();
  const appConfigService = app.get(AppConfigService);
  const port = appConfigService.port;

  /* Application Setup */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
    }),
  );
  app.enableShutdownHooks();
  app.setGlobalPrefix('/api');
  app.enableCors({ origin: enableCors(appConfigService) });
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  /* Swagger Setup */
  const config = new DocumentBuilder()
    .setTitle('AirFi Portal v2')
    .setDescription('The AirFi Portal v2 Webservices')
    .setVersion('0.0.1')
    .setContact(
      'Prathamesh-AirFi',
      'https://airfi.aero',
      'prathamesh@airfi.aero',
    )
    .addTag('Users', 'User Management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const customCssForSwagger = await readFile(
    join(process.cwd(), 'public', 'css', 'theme-muted.css'),
    'utf-8',
  );
  SwaggerModule.setup('api-docs', app, document, {
    customCss: customCssForSwagger,
  });

  await app.listen(port, () => {
    const formattedMessage = getFormattedConsole({
      port: getApplicationPort(port),
      dbConnStatus: getDatabaseStatus(dbConnection),
      redisStatus: getRedisStatus(redisClient.status),
      nodeEnv: getNodeEnvironment(appConfigService.nodeEnv),
    });

    console.info(formattedMessage);
  });
}
bootstrap();
