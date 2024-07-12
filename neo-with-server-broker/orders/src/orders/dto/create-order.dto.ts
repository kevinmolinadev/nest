import { ArrayMinSize, IsArray, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { CreateOrderItemDto } from "src/order-items";

export class CreateOrderDto {
    private _totalAmount: number;
    private _totalItems: number;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[]

    get getData() {
        return {
            totalAmount: this._totalAmount,
            totalItems: this._totalItems,
        }
    }

    set totalAmount(value: number) {
        this._totalAmount = value;
    }

    set totalItems(value: number) {
        this._totalItems = value;
    }
}
