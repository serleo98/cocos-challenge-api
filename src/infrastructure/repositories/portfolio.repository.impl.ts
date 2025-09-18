import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../../domain/entities/order.entity';
import { User } from '../../domain/entities/user.entity';
import { Portfolio } from '../../domain/entities/portfolio.entity';
import { PortfolioRepository } from '../../domain/repositories/portfolio.repository.interface';
import { PortfolioService } from '../../application/services/portfolio.service';

@Injectable()
export class PortfolioRepositoryImpl implements PortfolioRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly portfolioService: PortfolioService,
  ) {}

  async findByUserId(userId: string): Promise<Portfolio | null> {
    const numericUserId = parseInt(userId, 10);
    if (isNaN(numericUserId)) return null;
    
    return this.portfolioService.buildUserPortfolio(numericUserId);
  }
}