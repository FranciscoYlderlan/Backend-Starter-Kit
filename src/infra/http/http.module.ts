import { CreateUserUseCase } from '@/domain/users/application/use-cases/create-user';
import { ListUsersUseCase } from '@/domain/users/application/use-cases/list-users';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateUserController } from './controllers/create-user.controller';
import { ListUsersController } from './controllers/list-users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateUserController,
    AuthenticateController,
    ListUsersController,
  ],
  providers: [CreateUserUseCase, ListUsersUseCase],
})
export class HttpModule {}
