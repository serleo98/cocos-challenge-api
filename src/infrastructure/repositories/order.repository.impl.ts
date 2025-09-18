import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus, OrderType } from '../../domain/entities/order.entity';
import { OrderRepository } from '../../domain/repositories/order.repository.interface';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
  }

  async findByUserId(userId: number): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      where: { userId }
    });
    return orders.sort((a, b) => b.getDateTime().getTime() - a.getDateTime().getTime());
  }

  async findFilledByUserId(userId: string): Promise<Order[]> {
    const orders = await this.orderRepository.find({
      where: { 
        userId: parseInt(userId),
        status: OrderStatus.FILLED 
      },
      relations: ['instrument']
    });
    return orders.sort((a, b) => b.getDateTime().getTime() - a.getDateTime().getTime());
  }
  
}