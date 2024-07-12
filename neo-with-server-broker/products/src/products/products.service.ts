import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProductDatasource, PRODUCT_DATASOURCE_PROVIDER } from 'src/domain';
import { PaginationDto } from 'src/shared/dto/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(@Inject(PRODUCT_DATASOURCE_PROVIDER) private readonly datasource: IProductDatasource) { }

  create(createProductDto: CreateProductDto) {
    return this.datasource.create(createProductDto);
  }

  findAll(pagination: PaginationDto) {
    return this.datasource.getAll(pagination);
  }

  findOne(id: number) {
    return this.datasource.getById(id);
  }

  update(updateProductDto: UpdateProductDto) {
    return this.datasource.update(updateProductDto)
  }

  validateProducts(ids: number[]) {
    ids = Array.from(new Set(ids));
    return this.datasource.validateProductsById(ids);
  }

  async remove(id: number) {
    await this.datasource.delete(id);
    return { message: `The product with id #${id} deleted` };
  }
}
