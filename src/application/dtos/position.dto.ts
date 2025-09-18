import { ApiProperty } from '@nestjs/swagger';

export class PositionDto {
  @ApiProperty({ description: 'Position ID', required: false })
  id?: string;

  @ApiProperty({ description: 'Instrument ID' })
  instrumentId: string;
  
  @ApiProperty({ description: 'Instrument ticker symbol' })
  ticker?: string;
  
  @ApiProperty({ description: 'Instrument name' })
  name?: string;
  
  @ApiProperty({ description: 'Instrument type (STOCK, BOND, ETF, etc.)' })
  type?: string;

  @ApiProperty({ description: 'Quantity of instruments' })
  quantity: number;

  @ApiProperty({ description: 'Average purchase price' })
  averagePrice: number;

  @ApiProperty({ description: 'Position valuation' })
  valuation: number;
}