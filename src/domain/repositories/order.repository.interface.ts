import { Order, OrderStatus } from '../entities/order.entity';

export interface OrderRepository {
  findByUserId(userId: number): Promise<Order[]>;
  findFilledByUserId(userId: string): Promise<Order[]>;
}