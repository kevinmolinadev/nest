import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsPositive } from "class-validator";
import { OrderStatus } from "src/orders/entities/order.entity";

export class PaginationDto {
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    page: number = 1

    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    limit: number = 10

    @IsOptional()
    @IsEnum(OrderStatus, {
        message: `The value of the state can only be: ${Object.values(OrderStatus)}`
    })
    status?: OrderStatus;
}