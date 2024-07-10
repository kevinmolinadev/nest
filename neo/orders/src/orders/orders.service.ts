import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IOrderRepository, ORDER_REPOSITORY_PROVIDER } from './repositories/repository';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class OrdersService {
  constructor(@Inject(ORDER_REPOSITORY_PROVIDER) private readonly orderRepository: IOrderRepository) { }

  create(createOrderDto: CreateOrderDto) {
    return this.orderRepository.create(createOrderDto)
  }

  findAll(pagination: PaginationDto) {
    return this.orderRepository.getAll(pagination);
  }

  findOne(id: string) {
    return this.orderRepository.getOne(id);
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.updateStatus(id, updateOrderDto);
  }

}
