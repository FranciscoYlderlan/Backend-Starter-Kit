import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from './env';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const configService: ConfigService<Env, true> = app.get(ConfigService)
  const configService = app.get<ConfigService<Env, true>>(ConfigService);

  const PORT = configService.get('PORT', { infer: true });
  await app.listen(PORT);
}
bootstrap();
