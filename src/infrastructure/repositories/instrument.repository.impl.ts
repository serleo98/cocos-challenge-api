import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Instrument } from '../../domain/entities/instrument.entity';
import { InstrumentRepository } from '../../domain/repositories/instrument.repository.interface';

@Injectable()
export class InstrumentRepositoryImpl implements InstrumentRepository {
  constructor(
    @InjectRepository(Instrument)
    private readonly instrumentRepository: Repository<Instrument>,
  ) {
  }

  async findById(id: number): Promise<Instrument | null> {
    return this.instrumentRepository.findOneBy({ id });
  }

  async findByIds(ids: number[]): Promise<Instrument[]> {
    return this.instrumentRepository.findBy({ id: In(ids) });
  }

}