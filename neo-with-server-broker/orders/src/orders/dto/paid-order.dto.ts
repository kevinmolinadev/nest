import { IsString } from "class-validator";

export class PaidOrderDto {
    @IsString()
    id: string

    @IsString()
    receipt: string
}