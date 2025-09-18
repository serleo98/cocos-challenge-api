import { Instrument } from '../entities/instrument.entity';

export interface InstrumentRepository {
  findById(id: number): Promise<Instrument | null>;
  findByIds(ids: number[]): Promise<Instrument[]>;
}