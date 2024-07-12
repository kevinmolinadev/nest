import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { DataModule } from './data';

@Module({
  imports: [DataModule, ProductsModule]
})
export class AppModule { }
