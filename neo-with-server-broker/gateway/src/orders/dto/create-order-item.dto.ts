import { IsNumber, IsOptional, IsPositive, IsString, IsUUID } from "class-validator";

export class CreateOrderItemDto {
    @IsNumber()
    @IsPositive()
    idProduct: number;

    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsOptional()
    @IsString()
    @IsUUID()
    idOrder: string

}