import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './infrastructure/modules/user.module';
import { PortfolioModule } from './infrastructure/modules/portfolio.module';
import { DatabaseModule } from './infrastructure/modules/database.module';
import { InstrumentModule } from './infrastructure/modules/instrument.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UserModule, 
    PortfolioModule,
    InstrumentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}