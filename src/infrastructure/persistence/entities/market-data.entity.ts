import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InstrumentEntity } from './instrument.entity';

@Entity({ name: 'marketdata' })
export class MarketData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'instrumentid' })
  instrumentId: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  high: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  low: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  open: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  close: number;

  @Column({ name: 'previousclose', type: 'numeric', precision: 10, scale: 2 })
  previousClose: number;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => InstrumentEntity, (instrument) => instrument.marketData)
  @JoinColumn({ name: 'instrumentid' })
  instrument: InstrumentEntity;
}
