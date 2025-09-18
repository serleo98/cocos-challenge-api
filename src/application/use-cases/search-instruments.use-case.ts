import { Inject, Injectable } from '@nestjs/common';
import { DI_TOKENS } from '../../domain/constants/tokens';
import type { InstrumentRepository } from '../../domain/repositories/instrument.repository.interface';
import { InstrumentDto } from '../dtos/instrument.dto';
import { InstrumentMapper } from '../mappers/instrument.mapper';

@Injectable()
export class SearchInstrumentsUseCase {
  constructor(
    @Inject(DI_TOKENS.INSTRUMENT_REPOSITORY)
    private readonly instrumentRepository: InstrumentRepository,
  ) {}

  async execute(query: string): Promise<InstrumentDto[]> {
    const instruments = await this.instrumentRepository.searchByTickerOrName(query);
    return InstrumentMapper.toDtoList(instruments);
  }
}
