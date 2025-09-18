import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Instrument } from './instrument.entity';

export enum OrderType {
  BUY = 'BUY',
  SELL = 'SELL',
  CASH_IN = 'CASH_IN',
  CASH_OUT = 'CASH_OUT',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  FILLED = 'FILLED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'userid' })
  userId: number;

  @Column({ name: 'instrumentid', nullable: true })
  instrumentId: number;

  @Column({ name: 'type', type: 'varchar', length: 10 })
  type: OrderType;

  @Column({ name: 'size', type: 'integer' })
  quantity: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;
  
  @Column({ name: 'side', type: 'varchar', length: 10, nullable: true })
  side: string;

  @Column({ type: 'varchar', length: 20 })
  status: OrderStatus;

  @Column({ name: 'datetime', type: 'timestamp' })
  dateTime: Date;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'userid' })
  user: User;

  @ManyToOne(() => Instrument, instrument => instrument.orders, { nullable: true })
  @JoinColumn({ name: 'instrumentid' })
  instrument: Instrument;

  constructor(
    id: number,
    userId: number,
    instrumentId: number,
    type: OrderType,
    quantity: number,
    price: number,
    status: OrderStatus,
    dateTime: Date,
    side?: string,
  ) {
    this.id = id;
    this.userId = userId;
    this.instrumentId = instrumentId;
    this.type = type;
    this.quantity = quantity;
    this.price = price;
    this.status = status;
    this.dateTime = dateTime;
    this.side = side || '';
  }

  getId(): number {
    return this.id;
  }

  getUserId(): number {
    return this.userId;
  }

  getInstrumentId(): number {
    return this.instrumentId;
  }

  getType(): OrderType {
    return this.type;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getPrice(): number {
    return this.price;
  }

  getStatus(): OrderStatus {
    return this.status;
  }

  getDateTime(): Date {
    return this.dateTime;
  }
  
  getSide(): string {
    return this.side;
  }

  isFilled(): boolean {
    return this.status === OrderStatus.FILLED;
  }

  isCashTransaction(): boolean {
    return this.type === OrderType.CASH_IN || this.type === OrderType.CASH_OUT;
  }

  isTradeTransaction(): boolean {
    return this.type === OrderType.BUY || this.type === OrderType.SELL;
  }

  getTotalValue(): number {
    return this.quantity * this.price;
  }

  getCashImpact(): number {
    switch (this.type) {
      case OrderType.CASH_IN:
        return this.quantity;
      case OrderType.CASH_OUT:
        return -this.quantity;
      case OrderType.BUY:
        return -this.getTotalValue();
      case OrderType.SELL:
        return this.getTotalValue();
      default:
        return 0;
    }
  }
}