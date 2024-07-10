import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { DataModule } from './data';

@Module({
  imports: [DataModule,OrdersModule],
})
export class AppModule {}
