import { CreateUserUseCase } from '@/domain/users/application/use-cases/create-user';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateUserController } from './controllers/create-user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController, AuthenticateController],
  providers: [CreateUserUseCase],
})
export class HttpModule {}
