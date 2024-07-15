import { Module } from '@nestjs/common';
import { ProductsModule } from './products';
import { OrdersModule } from './orders';
import { PaymentsModule } from './payments';

@Module({
  imports: [ProductsModule, OrdersModule, PaymentsModule],
})
export class AppModule { }
