import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/shared";
import { OrderStatus } from "../enums/order-status.enum";

export class OrderPaginationDto extends PaginationDto {
    @IsOptional()
    @IsEnum(OrderStatus, {
        message: `The value of the status can only be: ${Object.values(OrderStatus)}`
    })
    status: OrderStatus;
}