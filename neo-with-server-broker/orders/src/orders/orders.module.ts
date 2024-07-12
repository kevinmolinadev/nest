import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ORDER_REPOSITORY_PROVIDER } from './repositories/repository';
import { OrderRepositoryPostgreSQL } from './repositories/postgresql/order.repository';
import { DataModule } from 'src/data';
import { OrderItemModule } from 'src/order-items';
import { NatsModule } from 'src/tranports';

@Module({
  imports: [
    DataModule,
    OrderItemModule,
    NatsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, {
    provide: ORDER_REPOSITORY_PROVIDER,
    useClass: OrderRepositoryPostgreSQL,
  }],
})
export class OrdersModule { }
