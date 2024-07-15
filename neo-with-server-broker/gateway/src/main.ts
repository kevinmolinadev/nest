import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcExceptionFilter } from './shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  app.setGlobalPrefix("api");

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  app.useGlobalFilters(new RpcExceptionFilter())

  await app.listen(Envs.PORT);
  Logger.log(`Gateway running on port ${Envs.PORT}`, "App");
}
bootstrap();
