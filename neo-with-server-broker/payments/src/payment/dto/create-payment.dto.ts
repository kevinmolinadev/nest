import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNumber, IsOptional, IsPositive, IsString, IsUUID, ValidateNested } from "class-validator";

export class CreatePaymentDto {
    @IsUUID()
    idOrder: string;

    @IsOptional()
    @IsString()
    current: string = "usd";

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => ItemDto)
    items: ItemDto[]
}

export class ItemDto {
    @IsNumber()
    @IsPositive()
    id: number

    @IsString()
    name: string;

    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsNumber()
    @IsPositive()
    price: number;
}