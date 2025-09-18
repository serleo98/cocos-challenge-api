import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetUsersUseCase } from '../../application/use-cases/get-users.use-case';
import { UserController } from '../adapter/input/user.entrypoint';
import { UserRepositoryImpl } from '../repositories/user.repository.impl';
import { User } from '../../domain/entities/user.entity';
import { REPOSITORY_TOKENS } from '../../domain/constants/tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [
    {
      provide: REPOSITORY_TOKENS.USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    {
      provide: GetUsersUseCase,
      useFactory: (userRepo) => new GetUsersUseCase(userRepo),
      inject: [REPOSITORY_TOKENS.USER_REPOSITORY],
    },
  ],
  exports: [TypeOrmModule, REPOSITORY_TOKENS.USER_REPOSITORY]
})
export class UserModule {}
