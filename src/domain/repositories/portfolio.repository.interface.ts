import { Portfolio } from '../entities/portfolio.entity';

export interface PortfolioRepository {
  findByUserId(userId: string): Promise<Portfolio | null>;
}