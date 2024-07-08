import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { SQLite } from "src/data";
import { IProductDatasource, Pagination, Records } from "src/domain";
import { CreateProductDto } from "src/products/dto/create-product.dto";
import { UpdateProductDto } from "src/products/dto/update-product.dto";
import { Product } from "src/products/entities/product.entity";

@Injectable()
export class SQLiteProductDatasource implements IProductDatasource {
    constructor(private readonly db: SQLite) { }

    async getAll(pagination: Pagination): Promise<Records<Product>> {
        const { limit, page } = pagination;
        const [total, data] = await Promise.all([
            await this.db.products.count({
                where: {
                    available: true
                }
            }),
            await this.db.products.findMany({
                take: limit,
                skip: (page - 1) * limit,
                where: {
                    available: true
                }
            })
        ])
        const products = data.map(Product.fromObject)
        return {
            data: products,
            metadata: {
                lastPage: Math.ceil(total / limit),
                total,
                page,
            }
        };
    }
    async getById(id: number): Promise<Product> {
        const product = await this.db.products.findUnique({
            where: {
                id,
                available: true
            }
        });
        if (!product) throw new RpcException(new NotFoundException(`The product with id #${id} not found`));
        return Product.fromObject(product);
    }
    async create(data: CreateProductDto): Promise<Product> {
        const product = await this.db.products.create({ data });
        return Product.fromObject(product);
    }
    async update(data: UpdateProductDto): Promise<Product> {
        await this.getById(data.id);
        const updated = await this.db.products.update({
            where: {
                id: data.id,
            },
            data: data.value,
        })
        return Product.fromObject(updated);
    }
    async delete(id: number): Promise<void> {
        await this.getById(id)
        await this.db.products.update({
            where: {
                id
            },
            data: {
                available: false
            }
        });
    }
}