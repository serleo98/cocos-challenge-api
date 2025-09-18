import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '../config/database.config';
import { User } from '../../domain/entities/user.entity';
import { Instrument } from '../../domain/entities/instrument.entity';
import { Order } from '../../domain/entities/order.entity';
import { MarketData } from '../../domain/entities/market-data.entity';

@Module({
  imports: [
    ConfigModule.forFeature(databaseConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
        entities: [
          User,
          Instrument,
          Order,
          MarketData
        ],
        synchronize: false, 
        migrationsRun: false, 
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
