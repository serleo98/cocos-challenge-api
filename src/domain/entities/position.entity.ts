import { Instrument } from './instrument.entity';
import { Portfolio } from './portfolio.entity';
import { MarketData } from './market-data.entity';

export class Position {
  private instrumentId: string;
  private quantity: number;
  private portfolio?: Portfolio;
  private instrument?: Instrument;
  private marketData?: MarketData;

  constructor(
    instrumentId: string,
    quantity: number,
  ) {
    this.instrumentId = instrumentId;
    this.quantity = quantity;
  }

  getInstrumentId(): string {
    return this.instrumentId;
  }

  getQuantity(): number {
    return this.quantity;
  }

  setInstrument(instrument: Instrument): void {
    this.instrument = instrument;
  }

  getInstrument(): Instrument | undefined {
    return this.instrument;
  }

  setMarketData(marketData: MarketData): void {
    this.marketData = marketData;
  }

  getMarketData(): MarketData | undefined {
    return this.marketData;
  }

  hasMarketData(): boolean {
    return !!this.marketData;
  }

  getMarketValue(): number | null {
    if (!this.marketData) return null;
    return this.quantity * this.marketData.getClose();
  }

  getDailyReturnPercentage(): number | null {
    if (!this.marketData) return null;
    return this.marketData.getDailyReturnPercentage();
  }
}