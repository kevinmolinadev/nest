import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { NatsModule } from 'src/tranports';

@Module({
  imports: [NatsModule],
  controllers: [ProductsController],
})
export class ProductsModule { }
