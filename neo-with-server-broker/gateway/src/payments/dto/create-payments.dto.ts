import { IsOptional, IsString } from "class-validator";

interface ItemPayment {
    id: number,
    name: string,
    quantity: number,
    price: number
}

export class CreatePaymentDto {
    @IsString()
    idOrder: string;

    @IsOptional()
    @IsString()
    current?: string = "usd"

    items: ItemPayment[]
}