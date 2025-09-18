import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'accountnumber', type: 'varchar', length: 20 })
  accountNumber: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
