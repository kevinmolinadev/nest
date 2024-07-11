import { FilterOrderItem, IOrderItemRepository, Records } from "../repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PostgreSQL } from "src/data";
import { RpcException } from "@nestjs/microservices";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { OrderItem } from "src/order-items/entities/order-item";
import { CreateOrderItemDto } from "src/order-items/dto/create-order-item.dto";

@Injectable()
export class OrderRepositoryPostgreSQL implements IOrderItemRepository {
    constructor(private readonly db: PostgreSQL) { }

    async getAll(pagination: PaginationDto, filter?: FilterOrderItem): Promise<Records> {
        const { page, limit } = pagination;
        const [total, data] = await Promise.all([
            this.db.order_items.count({ where: filter }),
            this.db.order_items.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: filter
            })
        ])
        return {
            data: data.map(OrderItem.fromObject),
            metadata: {
                total,
                page,
                lastPage: Math.ceil(total / limit)
            }
        };
    }
    async getOne(id: string): Promise<OrderItem> {
        const item = await this.db.order_items.findUnique({ where: { id } });
        if (!item) throw new RpcException(new NotFoundException(`The order item with id #${id} not found`));
        return OrderItem.fromObject(item);
    }

    async create(createDto: CreateOrderItemDto): Promise<OrderItem> {
        const item = await this.db.order_items.create({
            data: createDto
        })
        return OrderItem.fromObject(item);
    }
}