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
    
    if (!user) return null;
    
    
    const initialCash = 100000; 
    
    
    const filledOrders = await this.orderRepository.find({
      where: { 
        userId: userId,
        status: OrderStatus.FILLED
      },
      relations: ['instrument'],
      order: { dateTime: 'ASC' } 
    });
    
    
    let availableCash = initialCash;
    
    for (const order of filledOrders) {
      if (order.side === 'BUY') {
        availableCash -= order.quantity * order.price;
      } else if (order.side === 'SELL') {
        availableCash += order.quantity * order.price;
      }
    }
    
    
    const portfolio = new Portfolio(
      user.id.toString(),
      availableCash
    );
    
    portfolio.setUser(user);
    
    
    const positionsByInstrument = new Map<number, { 
      quantity: number, 
      instrumentId: number,
      totalCost: number, 
      buyQuantity: number
    }>();
    
    for (const order of filledOrders) {
      const instrumentId = order.instrumentId;
      const currentPosition = positionsByInstrument.get(instrumentId) || { 
        quantity: 0, 
        instrumentId, 
        totalCost: 0, 
        buyQuantity: 0 
      };
      
      if (order.side === 'BUY') {
        currentPosition.quantity += order.quantity;
        currentPosition.buyQuantity += order.quantity;
        currentPosition.totalCost += order.quantity * order.price;
      } else if (order.side === 'SELL') {
        currentPosition.quantity -= order.quantity;
        
      }
      
      
      currentPosition.quantity = Math.max(0, currentPosition.quantity);
      
      positionsByInstrument.set(instrumentId, currentPosition);
    }
    
    
    const positions: Position[] = [];
    
    for (const [instrumentId, positionData] of positionsByInstrument.entries()) {
      
      if (positionData.quantity > 0) {
        
        const averagePrice = positionData.buyQuantity > 0 
          ? positionData.totalCost / positionData.buyQuantity
          : 0;
          
        
        const position = new Position(
          instrumentId.toString(),
          positionData.quantity,
          averagePrice
        );
        
        
        const instrument = await this.instrumentRepository.findOne({
          where: { id: instrumentId }
        });
        
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
    
    
    const totalPortfolioValue = positions.reduce((total, position) => {
      const marketValue = position.getMarketValue();
      return total + (marketValue || 0);
    }, availableCash);
    
    return portfolio;
  }
}
