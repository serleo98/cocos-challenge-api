export class MarketDataNotFoundException extends Error {
  constructor(message: string = 'Market data not found') {
    super(message);
    this.name = 'MarketDataNotFoundException';
  }
}
