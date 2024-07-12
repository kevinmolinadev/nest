import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Inject, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { Services } from 'src/config';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CrudPattern } from 'src/shared';

@Controller('products')
export class ProductsController {
  constructor(@Inject(Services.Nats) private readonly client: ClientProxy) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.client.send(`${Services.Product}.${CrudPattern.create}`, createProductDto)
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.client.send(`${Services.Product}.${CrudPattern.getAll}`, paginationDto)
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.client.send(`${Services.Product}.${CrudPattern.getOne}`, { id })
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.client.send(`${Services.Product}.${CrudPattern.update}`, { id, ...updateProductDto })
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.client.send(`${Services.Product}.${CrudPattern.delete}`, { id })
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));
  }
}
