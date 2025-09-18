import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Instrument } from './instrument.entity';

@Entity('marketdata')
export class MarketData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'instrumentid' })
  instrumentId: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  open: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  high: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  low: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  close: number;

  @Column({ name: 'previousclose', type: 'decimal', precision: 10, scale: 2 })
  previousClose: number;
  
  createdAt?: Date;
  updatedAt?: Date;

  @ManyToOne(() => Instrument, instrument => instrument.marketData)
  @JoinColumn({ name: 'instrumentid' })
  instrument: Instrument;

  constructor(
    id: number,
    instrumentId: number,
    date: Date,
    open: number,
    high: number,
    low: number,
    close: number,
    previousClose: number,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.instrumentId = instrumentId;
    this.date = date;
    this.open = open;
    this.high = high;
    this.low = low;
    this.close = close;
    this.previousClose = previousClose;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId(): number {
    return this.id;
  }

  getInstrumentId(): number {
    return this.instrumentId;
  }

  getDate(): Date {
    return this.date;
  }

  getOpen(): number {
    return this.open;
  }

  getHigh(): number {
    return this.high;
  }

  getLow(): number {
    return this.low;
  }

  getClose(): number {
    return this.close;
  }

  getPreviousClose(): number {
    return this.previousClose;
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  getDailyReturnPercentage(): number {
    return ((this.close - this.previousClose) / this.previousClose) * 100;
  }
}