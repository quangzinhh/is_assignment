import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HousePredictionController } from './house-prediction/house-prediction.controller';

@Module({
  imports: [],
  controllers: [AppController, HousePredictionController],
  providers: [AppService],
})
export class AppModule {}
