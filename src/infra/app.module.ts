import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CreateUserController } from './http/controllers/create-user.controller';

import { envSchema } from './env';
import { HttpModule } from './http/http.module';
import { DatabaseModule } from './database/database.module';
@Module({
	imports: [ConfigModule.forRoot({ validate: (env) => envSchema.parse(env), isGlobal: true }), HttpModule, DatabaseModule],
	controllers: [CreateUserController],
})
export class AppModule {}
