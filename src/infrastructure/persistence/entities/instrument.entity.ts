import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MarketData } from './market-data.entity';
import { Order } from './order.entity';

@Entity({ name: 'instruments' })
export class InstrumentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10 })
  ticker: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 10 })
  type: string;

  @OneToMany(() => MarketData, (marketData) => marketData.instrument)
  marketData: MarketData[];

  @OneToMany(() => Order, (order) => order.instrument)
  orders: Order[];
}
