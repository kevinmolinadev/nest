import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @Type(() => Number)
    @IsNumber()
    id: number;

    get value() {
        const obj: Record<string, string | number | boolean> = {};
        if (this.description) obj.description = this.description;
        if (this.name) obj.name = this.name;
        if (this.price) obj.price = this.price;
        return obj;
    }
}
