import { Test, TestingModule } from '@nestjs/testing';
import { HousePredictionController } from './house-prediction.controller';

describe('HousePredictionController', () => {
  let controller: HousePredictionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HousePredictionController],
    }).compile();

    controller = module.get<HousePredictionController>(HousePredictionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
