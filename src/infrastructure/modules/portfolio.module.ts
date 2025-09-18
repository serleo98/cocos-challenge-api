import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetUserPortfolioUseCase } from '../../application/use-cases/get-user-portfolio.use-case';
import { PortfolioController } from '../adapter/input/portfolio.entrypoint';
import { OrderRepositoryImpl } from '../repositories/order.repository.impl';
import { InstrumentRepositoryImpl } from '../repositories/instrument.repository.impl';
import { MarketDataRepositoryImpl } from '../repositories/market-data.repository.impl';
import { PortfolioRepositoryImpl } from '../repositories/portfolio.repository.impl';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../exceptions/http-exception.filter';
import { Order } from '../../domain/entities/order.entity';
import { Instrument } from '../../domain/entities/instrument.entity';
import { MarketData } from '../../domain/entities/market-data.entity';
import { UserModule } from './user.module';
import { REPOSITORY_TOKENS } from '../../domain/constants/tokens';
import { PortfolioService } from '../../application/services/portfolio.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Instrument, MarketData]),
    UserModule
  ],
  controllers: [PortfolioController],
  providers: [
    PortfolioService,
    {
      provide: REPOSITORY_TOKENS.ORDER_REPOSITORY,
      useClass: OrderRepositoryImpl,
    },
    {
      provide: REPOSITORY_TOKENS.INSTRUMENT_REPOSITORY,
      useClass: InstrumentRepositoryImpl,
    },
    {
      provide: REPOSITORY_TOKENS.MARKET_DATA_REPOSITORY,
      useClass: MarketDataRepositoryImpl,
    },
    {
      provide: REPOSITORY_TOKENS.PORTFOLIO_REPOSITORY,
      useClass: PortfolioRepositoryImpl,
    },
    {
      provide: GetUserPortfolioUseCase,
      useFactory: (portfolioRepository) => 
        new GetUserPortfolioUseCase(portfolioRepository),
      inject: [REPOSITORY_TOKENS.PORTFOLIO_REPOSITORY],
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class PortfolioModule {}