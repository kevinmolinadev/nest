import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Inject, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { Pattern, Services } from 'src/config';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(Services.Product) private readonly productsService: ClientProxy) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.send(Pattern.create, createProductDto)
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productsService.send(Pattern.find, paginationDto)
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.send(Pattern.findOne, { id })
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.send(Pattern.update, { id, ...updateProductDto })
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.send(Pattern.delete, { id })
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));
  }
}
