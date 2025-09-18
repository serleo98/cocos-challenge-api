import { Portfolio } from '../../domain/entities/portfolio.entity';
import { PortfolioDto } from '../dtos/portfolio.dto';

export class PortfolioMapper {
  static toDto(portfolio: Portfolio): PortfolioDto {
    return {
      userId: portfolio.getUserId(),
      positions: portfolio.getPositions().map(position => {
        const instrument = position.getInstrument();
        return {
          instrumentId: position.getInstrumentId(),
          ticker: instrument?.getTicker(),
          name: instrument?.getName(),
          type: instrument?.getType(),
          quantity: position.getQuantity(),
          averagePrice: 0,
          valuation: position.getMarketValue() || 0
        };
      }),
      totalValuation: portfolio.getTotalAccountValue()
    };
  }
}