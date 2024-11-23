import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceHistory } from './entities/price-history.entity';
import { Alert } from './entities/alert.entity';
import { plainToInstance } from 'class-transformer';
import { CreateAlertDto } from './dto/create-alert.dto';
import axios from 'axios';

@Injectable()
export class PriceService {
  private readonly logger = new Logger(PriceService.name);
  constructor(
    @InjectRepository(PriceHistory)
    private readonly priceHistoryRepository: Repository<PriceHistory>,
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
  ) {}

  @Cron('*/5 * * * *')
  async fetchPrices(): Promise<void> {
    const chains = ['ethereum', 'polygon'];
    const prices = await Promise.all(
      chains.map((chain) => this.getPriceFromAPI(chain)),
    );

    prices.forEach(async (price, index) => {
      await this.priceHistoryRepository.save({
        chain: chains[index],
        price,
        timestamp: new Date(),
      });
    });
  }

  private async getPriceFromAPI(chain: string): Promise<number> {
    const moralisApiUrl = `https://deep-index.moralis.io/api/v2.2/${chain}/price`;
    const apiKey = process.env.MORALIS_API_KEY;

    try {
      const response = await axios.get(moralisApiUrl, {
        headers: {
          accept: 'application/json',
          'X-API-Key': apiKey,
        },
      });

      return response.data.price;
    } catch (error) {
      console.error(
        `Error fetching price for ${chain}:`,
        error.response?.data || error.message,
      );
      throw new Error(`Failed to fetch price for ${chain}`);
    }
  }

  async getPriceHistory(chain: string): Promise<PriceHistory[]> {
    this.logger.log(`Fetching price history for chain: ${chain}`);
    return this.priceHistoryRepository.find({
      where: { chain },
      order: { timestamp: 'DESC' },
      take: 24,
    });
  }

  async setAlert(createAlertDto: CreateAlertDto): Promise<Alert> {
    const alertEntity = plainToInstance(Alert, {
      ...createAlertDto,
      triggered: false,
    });

    return this.alertRepository.save(alertEntity);
  }

  async getSwapRate(
    ethAmount: number,
  ): Promise<{ btcAmount: number; fee: { eth: number; usd: number } }> {
    const ethToBtcRate = await this.getSwapRateFromAPI();
    const btcAmount = ethAmount * ethToBtcRate;
    const fee = ethAmount * 0.03;

    const ethToUsdRate = 1800;
    return {
      btcAmount,
      fee: {
        eth: fee,
        usd: fee * ethToUsdRate,
      },
    };
  }

  private async getSwapRateFromAPI(): Promise<number> {
    const apiUrl = 'https://deep-index.moralis.io/api/v2.2/eth/btc/swap-rate';
    const apiKey = process.env.MORALIS_API_KEY;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          accept: 'application/json',
          'X-API-Key': apiKey,
        },
      });

      return response.data.rate;
    } catch (error) {
      console.error(
        'Error fetching swap rate:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to fetch swap rate');
    }
  }
}
