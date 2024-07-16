import { Module } from '@nestjs/common';
import { ProductsModule } from './products';
import { OrdersModule } from './orders';
import { PaymentsModule } from './payments';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductsModule, OrdersModule, PaymentsModule, AuthModule],
})
export class AppModule { }
