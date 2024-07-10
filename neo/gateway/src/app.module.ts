import { Module } from '@nestjs/common';
import { ProductsModule } from './products';
import { OrdersModule } from './orders';

@Module({
  imports: [ProductsModule, OrdersModule],
})
export class AppModule { }
