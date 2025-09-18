import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUsersUseCase } from '../../../application/use-cases/get-users.use-case';
import { User } from '../../../domain/entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly getUsersUseCase: GetUsersUseCase) {}

  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de usuarios obtenida correctamente',
    type: [User]
  })
  @Get()
  async getUsers(): Promise<User[]> {
    return this.getUsersUseCase.execute();
  }
}