import { ForbiddenException } from '@nestjs/common';
import { CustomOrigin } from '@nestjs/common/interfaces/external/cors-options.interface';

import { AppConfigService } from '@config/app-config.service';

export const enableCors = (
  appConfigService: AppConfigService,
): CustomOrigin => {
  return (origin, callback) => {
    if (!origin || appConfigService.isTest || appConfigService.isDevelopment) {
      return callback(null, true);
    }

    if (
      origin &&
      appConfigService.isProduction &&
      origin.includes('airfi.aero')
    ) {
      return callback(null, true);
    } else {
      return callback(
        new ForbiddenException(
          `Not allowed by CORS: Origin ${origin || 'localhost'} is not allowed`,
        ),
        false,
      );
    }
  };
};
