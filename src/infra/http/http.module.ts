import { CreateUserUseCase } from '@/domain/users/application/use-cases/create-user';
import { DeleteUserUseCase } from '@/domain/users/application/use-cases/delete-user';
import { ListUsersUseCase } from '@/domain/users/application/use-cases/list-users';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateUserController } from './controllers/create-user.controller';
import { DeleteUserController } from './controllers/delete-user.controller';
import { ListUsersController } from './controllers/list-users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateUserController,
    AuthenticateController,
    ListUsersController,
    DeleteUserController,
  ],
  providers: [CreateUserUseCase, ListUsersUseCase, DeleteUserUseCase],
})
export class HttpModule {}
