import { Controller, Get, Post, Body, Patch, Param, Inject, Query, ParseUUIDPipe } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { Pattern, Services } from 'src/config';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderPaginationDto } from './dto/pagination-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(Services.Order) private readonly ordersService: ClientProxy) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.send(Pattern.create, createOrderDto)
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));
  }

  @Get()
  findAll(@Query() paginationDto: OrderPaginationDto) {
    return this.ordersService.send(Pattern.find, paginationDto)
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));;
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.send(Pattern.findOne, { id })
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.send(Pattern.update, { id, ...updateOrderDto })
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));
  }
}
