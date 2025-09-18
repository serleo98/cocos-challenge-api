import { Instrument } from './instrument.entity';
import { Portfolio } from './portfolio.entity';
import { MarketData } from './market-data.entity';

export class Position {
  private instrumentId: string;
  private quantity: number;
  private portfolio?: Portfolio;
  private instrument?: Instrument;
  private marketData?: MarketData;
  private averagePrice: number = 0;

  constructor(
    instrumentId: string,
    quantity: number,
    averagePrice: number = 0
  ) {
    this.instrumentId = instrumentId;
    this.quantity = quantity;
    this.averagePrice = averagePrice;
  }

  getInstrumentId(): string {
    return this.instrumentId;
  }

  getQuantity(): number {
    return this.quantity;
  }
  
  getAveragePrice(): number {
    return this.averagePrice;
  }
  
  setAveragePrice(price: number): void {
    this.averagePrice = price;
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

  getTotalReturnPercentage(): number | null {
    if (!this.marketData || this.averagePrice === 0) return null;
    const currentPrice = this.marketData.getClose();
    return ((currentPrice - this.averagePrice) / this.averagePrice) * 100;
  }
}