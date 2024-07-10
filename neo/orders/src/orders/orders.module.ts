import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ORDER_REPOSITORY_PROVIDER } from './repositories/repository';
import { OrderRepositoryPostgreSQL } from './repositories/postgresql/order.repository';
import { DataModule } from 'src/data';

@Module({
  imports: [DataModule],
  controllers: [OrdersController],
  providers: [OrdersService, {
    provide: ORDER_REPOSITORY_PROVIDER,
    useClass: OrderRepositoryPostgreSQL,
  }],
})
export class OrdersModule { }
