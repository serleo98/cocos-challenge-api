import { MarketData } from '../entities/market-data.entity';

export interface MarketDataRepository {
  findLatestByInstrumentId(instrumentId: string): Promise<MarketData | null>;
  findLatestByInstrumentIds(instrumentIds: string[]): Promise<MarketData[]>;
}