import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true
  });
  app.setGlobalPrefix("api");

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }))

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: Envs.NATS_SERVERS
    },
  }, { inheritAppConfig: true });
  await app.startAllMicroservices();

  await app.listen(Envs.PORT);
  Logger.log(`Server running on port ${Envs.PORT}`, "App")
}
bootstrap();
