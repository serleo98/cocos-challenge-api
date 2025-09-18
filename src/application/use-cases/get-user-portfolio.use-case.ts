import { Injectable } from '@nestjs/common';
import type { PortfolioRepository } from '../../domain/repositories/portfolio.repository.interface';
import { Portfolio } from '../../domain/entities/portfolio.entity';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';

@Injectable()
export class GetUserPortfolioUseCase {
  constructor(private readonly portfolioRepository: PortfolioRepository) {}

  async execute(userId: string): Promise<Portfolio> {
    const portfolio = await this.portfolioRepository.findByUserId(userId);
    
    if (!portfolio) {
      throw new UserNotFoundException(userId);
    }

    return portfolio;
  }
}