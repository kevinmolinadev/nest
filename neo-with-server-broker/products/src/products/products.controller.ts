import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductPattern } from '../config';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @MessagePattern(ProductPattern.create)
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern(ProductPattern.getAll)
  findAll(@Payload() pagination: PaginationDto) {
    return this.productsService.findAll(pagination);
  }

  @MessagePattern(ProductPattern.getOne)
  findOne(@Payload('id') id: number) {
    return this.productsService.findOne(id);
  }

  @MessagePattern(ProductPattern.update)
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto);
  }

  @MessagePattern(ProductPattern.validateProducts)
  validateProducts(@Payload() ids: number[]) {
    return this.productsService.validateProducts(ids);
  }

  @MessagePattern(ProductPattern.delete)
  remove(@Payload('id') id: number) {
    return this.productsService.remove(id);
  }
}
