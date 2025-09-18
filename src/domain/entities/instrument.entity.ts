import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MarketData } from './market-data.entity';
import { Order } from './order.entity';

export enum InstrumentType {
  STOCK = 'STOCK',
  BOND = 'BOND',
  ETF = 'ETF',
  MUTUAL_FUND = 'MUTUAL_FUND',
  CURRENCY = 'CURRENCY',
}

@Entity('instruments')
export class Instrument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  ticker: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @OneToMany(() => MarketData, marketData => marketData.instrument)
  marketData: MarketData[];
  positions?: any[];

  @OneToMany(() => Order, order => order.instrument)
  orders: Order[];

  constructor(
    id: number,
    ticker: string,
    name: string,
    type: string,
  ) {
    this.id = id;
    this.ticker = ticker;
    this.name = name;
    this.type = type;
  }

  getId(): number {
    return this.id;
  }

  getTicker(): string {
    return this.ticker;
  }

  getName(): string {
    return this.name;
  }

  getType(): string {
    return this.type;
  }

  isCurrency(): boolean {
    return this.type === 'CURRENCY';
  }
}