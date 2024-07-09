import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Envs } from './config';
import { Logger } from '@nestjs/common';
import { RpcExceptionFilter } from './shared/exceptions/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.useGlobalFilters(new RpcExceptionFilter())
  await app.listen(Envs.PORT);
  Logger.log(`Gateway running on port ${Envs.PORT}`, "App");
}
bootstrap();
