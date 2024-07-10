import { IsEnum } from 'class-validator';
import { OrderStatus } from '../enums/order-status.enum';

export class UpdateOrderDto {
  @IsEnum(OrderStatus, {
    message: `The value of the status can only be: ${Object.values(OrderStatus)}`
  })
  status: OrderStatus;
}
