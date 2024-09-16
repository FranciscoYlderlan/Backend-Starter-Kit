import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateUserController } from './controllers/create-user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUserController, AuthenticateController],
})
export class HttpModule {}
