import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { InstrumentEntity } from './instrument.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'instrumentid' })
  instrumentId: number;

  @Column({ name: 'userid' })
  userId: number;

  @Column({ type: 'integer' })
  size: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 10 })
  type: string;

  @Column({ type: 'varchar', length: 10 })
  side: string;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @Column({ type: 'timestamp' })
  datetime: Date;

  @ManyToOne(() => InstrumentEntity, (instrument) => instrument.orders)
  @JoinColumn({ name: 'instrumentid' })
  instrument: InstrumentEntity;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'userid' })
  user: UserEntity;
}
