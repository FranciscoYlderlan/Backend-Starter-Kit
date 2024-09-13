import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';

import { CreateUserController } from './http/controllers/create-user.controller';

import { envSchema } from './env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),

    HttpModule,
    AuthModule,
    DatabaseModule,
  ],
  controllers: [CreateUserController],
})
export class AppModule {}
