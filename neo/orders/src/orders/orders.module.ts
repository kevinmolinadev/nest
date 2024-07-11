import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ORDER_REPOSITORY_PROVIDER } from './repositories/repository';
import { OrderRepositoryPostgreSQL } from './repositories/postgresql/order.repository';
import { DataModule } from 'src/data';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Envs, Services } from 'src/config';
import { OrderItemModule } from 'src/order-items';

@Module({
  imports: [
    DataModule,
    OrderItemModule,
    ClientsModule.register([
      {
        name: Services.Product,
        transport: Transport.TCP,
        options: {
          host: Envs.MS_PRODUCT_HOST,
          port: Envs.MS_PRODUCT_PORT,
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, {
    provide: ORDER_REPOSITORY_PROVIDER,
    useClass: OrderRepositoryPostgreSQL,
  }],
})
export class OrdersModule { }
