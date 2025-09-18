import { Module } from '@nestjs/common';
import { InstrumentController } from '../adapter/input/instrument.entrypoint';
import { SearchInstrumentsUseCase } from '../../application/use-cases/search-instruments.use-case';
import { InstrumentRepositoryImpl } from '../repositories/instrument.repository.impl';
import { DomainEntitiesModule } from './domain-entities.module';
import { DI_TOKENS } from '../../domain/constants/tokens';

@Module({
  imports: [DomainEntitiesModule],
  controllers: [InstrumentController],
  providers: [
    SearchInstrumentsUseCase,
    {
      provide: DI_TOKENS.INSTRUMENT_REPOSITORY,
      useClass: InstrumentRepositoryImpl,
    }
  ],
  exports: [SearchInstrumentsUseCase]
})
export class InstrumentModule {}
