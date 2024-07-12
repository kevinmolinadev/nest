import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { NatsModule } from 'src/tranports';

@Module({
  imports: [NatsModule],
  controllers: [OrdersController],
})
export class OrdersModule { }
