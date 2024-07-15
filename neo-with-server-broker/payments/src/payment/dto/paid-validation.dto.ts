import { IsObject, IsString } from "class-validator"

export class PaidValidationDto {
    @IsString()
    signature: string | string[]

    @IsObject()
    rawBody: ArrayBuffer
}