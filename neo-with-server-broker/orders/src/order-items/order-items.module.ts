import { Module } from '@nestjs/common';
import { OrderRepositoryPostgreSQL } from './repositories/postgresql/order-item.repository';
import { DataModule } from 'src/data';
import { OrderItemService } from './order-items.service';
import { ORDER_ITEM_REPOSITORY_PROVIDER } from './repositories/repository';

@Module({
  imports: [
    DataModule,
  ],
  providers: [
    OrderItemService,
    {
      provide: ORDER_ITEM_REPOSITORY_PROVIDER,
      useClass: OrderRepositoryPostgreSQL,
    },
  ],
  exports: [OrderItemService]
})
export class OrderItemModule { }
