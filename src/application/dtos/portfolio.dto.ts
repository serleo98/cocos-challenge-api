import { ApiProperty } from '@nestjs/swagger';
import { PositionDto } from './position.dto';

export class PortfolioDto {
  @ApiProperty({ description: 'Portfolio ID', required: false })
  id?: string;

  @ApiProperty({ description: 'User ID' })
  userId: string;

  @ApiProperty({ description: 'List of positions', type: [PositionDto] })
  positions: PositionDto[];

  @ApiProperty({ description: 'Total portfolio valuation in ARS' })
  totalAccountValueARS: number;

  @ApiProperty({ description: 'Available cash for trading in ARS' })
  availableCash: number;
}