import { Product } from "src/products/entities/product.entity";
import { Datasource } from "../datasource";
import { CreateProductDto } from "src/products/dto/create-product.dto";
import { UpdateProductDto } from "src/products/dto/update-product.dto";

export const PRODUCT_DATASOURCE_PROVIDER = "PRODUCT_DT";
export interface IProductDatasource extends Datasource<Product, CreateProductDto, UpdateProductDto, number> { }