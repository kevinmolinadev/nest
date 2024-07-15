import { Controller, Get, Post, Body, Patch, Param, Inject, Query, ParseUUIDPipe } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { Services } from 'src/config';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderPaginationDto } from './dto/pagination-order.dto';
import { PaymentsService } from 'src/payments/payments.service';
import { OrderPattern } from './pattern';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(Services.Nats) private readonly client: ClientProxy,
    private readonly paymentService: PaymentsService,
  ) { }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await firstValueFrom(this.client.send(OrderPattern.create, createOrderDto));
      const paymentSession = await firstValueFrom(this.paymentService.createPaymentSession({ idOrder: order.id, items: order.orderItems }))
      return { order, paymentSession };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAll(@Query() paginationDto: OrderPaginationDto) {
    return this.client.send(OrderPattern.getAll, paginationDto)
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));;
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send(OrderPattern.getOne, { id })
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.client.send(OrderPattern.update, { id, ...updateOrderDto })
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));
  }
}
