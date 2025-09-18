import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { MarketData } from '../../domain/entities/market-data.entity';
import { MarketDataRepository } from '../../domain/repositories/market-data.repository.interface';

@Injectable()
export class MarketDataRepositoryImpl implements MarketDataRepository {
  constructor(
    @InjectRepository(MarketData)
    private readonly marketDataRepository: Repository<MarketData>,
  ) {
  }

  async findLatestByInstrumentId(instrumentId: string): Promise<MarketData | null> {
    const marketData = await this.marketDataRepository.find({
      where: { instrumentId: parseInt(instrumentId) },
      order: {
        date: 'DESC'
      },
      take: 1
    });
    return marketData.length > 0 ? marketData[0] : null;
  }

  async findLatestByInstrumentIds(instrumentIds: string[]): Promise<MarketData[]> {
    const numericIds = instrumentIds.map(id => parseInt(id));
    return this.marketDataRepository.findBy({
      instrumentId: In(numericIds)
    });
  }

}