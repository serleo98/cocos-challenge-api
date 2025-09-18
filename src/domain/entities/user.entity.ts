import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Portfolio } from './portfolio.entity';
import { Order } from './order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID único del usuario' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'Email del usuario' })
  email: string;

  @Column({ name: 'accountnumber' })
  @ApiProperty({ description: 'Número de cuenta del usuario' })
  accountNumber: string;

  portfolios?: Portfolio[];

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  constructor(
    id: number,
    email: string,
    accountNumber: string,
  ) {
    this.id = id;
    this.email = email;
    this.accountNumber = accountNumber;
  }

  getId(): number {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getAccountNumber(): string {
    return this.accountNumber;
  }
}