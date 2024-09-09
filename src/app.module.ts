import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controllers/create-user.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { envSchema } from './env';
@Module({
	imports: [ConfigModule.forRoot({ validate: (env) => envSchema.parse(env), isGlobal: true })],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}
