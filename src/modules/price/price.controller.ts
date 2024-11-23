import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PriceService } from './price.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { SwapRateDto } from './dto/swap-rate.dto';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get('history')
  getPriceHistory(@Query('chain') chain: string) {
    return this.priceService.getPriceHistory(chain);
  }

  @Post('alert')
  setAlert(@Body() createAlertDto: CreateAlertDto) {
    return this.priceService.setAlert(createAlertDto);
  }

  @Get('swap-rate')
  getSwapRate(@Query() swapRateDto: SwapRateDto) {
    return this.priceService.getSwapRate(swapRateDto.ethAmount);
  }
}
