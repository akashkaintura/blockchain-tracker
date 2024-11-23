import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceHistory } from './entities/price-history.entity';
import { Alert } from './entities/alert.entity';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';

@Module({
  imports: [TypeOrmModule.forFeature([PriceHistory, Alert])],
  controllers: [PriceController],
  providers: [PriceService],
})
export class PriceModule {}
