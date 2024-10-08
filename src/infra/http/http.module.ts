import { AuthenticateUserUseCase } from '@/domain/users/application/use-cases/authenticate-user';
import { CreateUserUseCase } from '@/domain/users/application/use-cases/create-user';
import { DeleteUserUseCase } from '@/domain/users/application/use-cases/delete-user';
import { FindUserUseCase } from '@/domain/users/application/use-cases/find-user';
import { ListUsersUseCase } from '@/domain/users/application/use-cases/list-users';
import { Module } from '@nestjs/common';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateUserController } from './controllers/create-user.controller';
import { DeleteUserController } from './controllers/delete-user.controller';
import { ListUsersController } from './controllers/list-users.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateUserController,
    AuthenticateController,
    ListUsersController,
    DeleteUserController,
  ],
  providers: [
    AuthenticateUserUseCase,
    ListUsersUseCase,
    FindUserUseCase,
    CreateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class HttpModule {}
