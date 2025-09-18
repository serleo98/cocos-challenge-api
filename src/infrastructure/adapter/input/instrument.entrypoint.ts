import { Controller, Get, Query } from '@nestjs/common';
import { SearchInstrumentsUseCase } from '../../../application/use-cases/search-instruments.use-case';
import { InstrumentDto } from '../../../application/dtos/instrument.dto';

@Controller('instruments')
export class InstrumentController {
  constructor(private readonly searchInstrumentsUseCase: SearchInstrumentsUseCase) {}

  @Get()
  async searchInstruments(@Query('q') query: string): Promise<InstrumentDto[]> {
    return this.searchInstrumentsUseCase.execute(query || '');
  }
}
