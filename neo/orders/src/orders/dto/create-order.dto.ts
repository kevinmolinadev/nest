import { Type } from "class-transformer"
import { IsPositive } from "class-validator"

export class CreateOrderDto {
    @Type(() => Number)
    @IsPositive()
    totalAmount: number

    @Type(() => Number)
    @IsPositive()
    totalItems: number
}
