import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { Instrument } from '../../domain/entities/instrument.entity';
import { Order } from '../../domain/entities/order.entity';
import { MarketData } from '../../domain/entities/market-data.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Instrument,
      Order,
      MarketData
    ]),
  ],
  exports: [TypeOrmModule],
})
export class DomainEntitiesModule {}
