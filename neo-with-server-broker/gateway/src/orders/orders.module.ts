import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { NatsModule } from 'src/tranports';
import { PaymentsModule } from 'src/payments';

@Module({
  imports: [NatsModule, PaymentsModule],
  controllers: [OrdersController],
})
export class OrdersModule { }
