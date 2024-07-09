import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Envs, Services } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: Services.Product,
        transport: Transport.TCP,
        options: {
          host: Envs.MS_PRODUCT_HOST,
          port: Envs.MS_PRODUCT_PORT,
        },
      },
    ]),
  ],
  controllers: [ProductsController],
})
export class ProductsModule { }
