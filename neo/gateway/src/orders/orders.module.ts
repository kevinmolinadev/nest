import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Envs, Services } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: Services.Order,
        transport: Transport.TCP,
        options: {
          host: Envs.MS_ORDER_HOST,
          port: Envs.MS_ORDER_PORT,
        },
      },
    ]),
  ],
  controllers: [OrdersController],
})
export class OrdersModule { }
