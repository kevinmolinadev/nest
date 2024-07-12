import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus } from "../entities/order.entity";
import { PaginationDto } from "src/shared";

export class OrderPaginationDto extends PaginationDto {
    @IsOptional()
    @IsEnum(OrderStatus, {
        message: `The value of the state can only be: ${Object.values(OrderStatus)}`
    })
    status?: OrderStatus;
}