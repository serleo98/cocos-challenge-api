import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../domain/entities/user.entity';
import { Order, OrderStatus } from '../../domain/entities/order.entity';
import { MarketData } from '../../domain/entities/market-data.entity';
import { Instrument } from '../../domain/entities/instrument.entity';
import { Portfolio } from '../../domain/entities/portfolio.entity';
import { Position } from '../../domain/entities/position.entity';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(MarketData)
    private marketDataRepository: Repository<MarketData>,
    @InjectRepository(Instrument)
    private instrumentRepository: Repository<Instrument>,
  ) {}

  async buildUserPortfolio(userId: number): Promise<Portfolio | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    console.log(user);
    if (!user) return null;
    
    const portfolio = new Portfolio(
      user.id.toString(),
      0
    );
    
    portfolio.setUser(user);
    
    const orders = await this.orderRepository.find({
      where: { 
        userId: userId,
        status: OrderStatus.FILLED
      },
      relations: ['instrument']
    });

    console.log(orders);
    
    
    const positionsByInstrument = new Map<number, { quantity: number, instrumentId: number }>();
    
    for (const order of orders) {
      const instrumentId = order.instrumentId;
      const currentPosition = positionsByInstrument.get(instrumentId) || { quantity: 0, instrumentId };
      
      
      if (order.side === 'BUY') {
        currentPosition.quantity += order.quantity;
      } else if (order.side === 'SELL') {
        currentPosition.quantity -= order.quantity;
      }
      
      positionsByInstrument.set(instrumentId, currentPosition);
    }
    
    
    const positions: Position[] = [];
    
    for (const [instrumentId, positionData] of positionsByInstrument.entries()) {
      
      if (positionData.quantity !== 0) {
        const position = new Position(
          instrumentId.toString(),
          positionData.quantity
        );
        
        
        const instrument = await this.instrumentRepository.findOne({
          where: { id: instrumentId }
        });

        console.log(instrument);
        
        if (instrument) {
          position.setInstrument(instrument);
          
          
          const marketData = await this.marketDataRepository.findOne({
            where: { instrumentId },
            order: { date: 'DESC' }
          });
          
          if (marketData) {
            position.setMarketData(marketData);
          }
        }
        
        positions.push(position);
      }
    }
    
    
    portfolio.setPositions(positions);

    console.log(portfolio);
    return portfolio;
  }
}
