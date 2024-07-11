import { Inject, Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { FilterOrderItem, IOrderItemRepository, ORDER_ITEM_REPOSITORY_PROVIDER } from './repositories/repository';
import { CreateOrderItemDto } from './dto/create-order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @Inject(ORDER_ITEM_REPOSITORY_PROVIDER) private readonly orderItemRepository: IOrderItemRepository,
  ) { }

  create(createDto: CreateOrderItemDto) {
    return this.orderItemRepository.create(createDto);
  }

  findAll(pagination: PaginationDto = { page: 1, limit: 10 }, filter?: FilterOrderItem) {
    return this.orderItemRepository.getAll(pagination, filter);
  }

  findOne(id: string) {
    return this.orderItemRepository.getOne(id);
  }
}
