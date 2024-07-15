import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsEnum, IsString } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsString()
  id: string;

  @IsEnum(OrderStatus, {
    message: `The value of the state can only be: ${Object.values(OrderStatus)}`
  })
  status: OrderStatus;
}
