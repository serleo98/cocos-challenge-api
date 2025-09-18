import { Controller, Get, Param, Query, ParseBoolPipe, Optional } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';
import { GetUserPortfolioUseCase } from '../../../application/use-cases/get-user-portfolio.use-case';
import { PortfolioDto } from '../../../application/dtos/portfolio.dto';
import { PortfolioMapper } from '../../../application/mappers/portfolio.mapper';

@ApiTags('portfolio')
@Controller('users')
export class PortfolioController {
  constructor(private readonly getUserPortfolioUseCase: GetUserPortfolioUseCase) {}

  @ApiOperation({ summary: 'Obtener portfolio de un usuario' })
  @ApiParam({ name: 'userId', description: 'ID del usuario' })
  @ApiResponse({ 
    status: 200, 
    description: 'Portfolio obtenido correctamente',
    type: PortfolioDto
  })
  
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @Get(':userId/portfolio')
  async getUserPortfolio(
    @Param('userId') userId: string): Promise<PortfolioDto> {
    const portfolio = await this.getUserPortfolioUseCase.execute(userId);
    return PortfolioMapper.toDto(portfolio);
  }
}
