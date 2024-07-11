import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { DataModule } from './data';
import { OrderItemModule } from './order-items';

@Module({
  imports: [DataModule, OrdersModule, OrderItemModule],
})
export class AppModule {}
