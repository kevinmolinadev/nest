import { Controller, Get, Post, Body, Patch, Param, Inject, Query, ParseUUIDPipe } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { Services } from 'src/config';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderPaginationDto } from './dto/pagination-order.dto';
import { CrudPattern } from 'src/shared';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(Services.Nats) private readonly client: ClientProxy) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send(`${Services.Order}.${CrudPattern.create}`, createOrderDto)
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));
  }

  @Get()
  findAll(@Query() paginationDto: OrderPaginationDto) {
    return this.client.send(`${Services.Order}.${CrudPattern.getAll}`, paginationDto)
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));;
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send(`${Services.Order}.${CrudPattern.getOne}`, { id })
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.client.send(`${Services.Order}.${CrudPattern.update}`, { id, ...updateOrderDto })
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));
  }
}
