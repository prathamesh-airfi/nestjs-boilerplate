import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from './app.service';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Health Status: OK"', () => {
      expect(appController.getHello()).toBe('Health Status: OK');
    });
  });
});
