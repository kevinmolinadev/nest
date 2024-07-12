import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DataModule } from 'src/data';
import { SQLiteProductDatasource } from './datasources/sqlite/product.datasource';
import { PRODUCT_DATASOURCE_PROVIDER } from 'src/domain';

@Module({
  imports: [DataModule],
  controllers: [ProductsController],
  providers: [ProductsService, {
    provide: PRODUCT_DATASOURCE_PROVIDER,
    useClass: SQLiteProductDatasource,
  }],
})
export class ProductsModule { } 
