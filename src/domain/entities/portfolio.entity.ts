import { Position } from './position.entity';
import { User } from './user.entity';

export class Portfolio {
  private userId: string;
  private availableCash: number;
  private user?: User;
  private positions?: Position[];

  constructor(
    userId: string,
    availableCash: number,
  ) {
    this.userId = userId;
    this.availableCash = availableCash;
  }

  getUserId(): string {
    return this.userId;
  }

  getAvailableCash(): number {
    return this.availableCash;
  }

  setPositions(positions: Position[]): void {
    this.positions = positions;
  }

  getPositions(): Position[] {
    return this.positions || [];
  }

  setUser(user: User): void {
    this.user = user;
  }

  getUser(): User | undefined {
    return this.user;
  }

  getTotalAccountValue(): number {
    let totalPositionsValue = 0;
    
    if (this.positions) {
      for (const position of this.positions) {
        const marketValue = position.getMarketValue();
        if (marketValue !== null) {
          totalPositionsValue += marketValue;
        }
      }
    }
    
    return this.availableCash + totalPositionsValue;
  }

  hasIncompleteValuation(): boolean {
    return this.positions ? this.positions.some(position => !position.hasMarketData()) : false;
  }
}