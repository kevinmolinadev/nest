import { IOrderRepository, Records } from "../repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PostgreSQL } from "src/data";
import { RpcException } from "@nestjs/microservices";
import { CreateOrderDto } from "src/orders/dto/create-order.dto";
import { UpdateOrderDto } from "src/orders/dto/update-order.dto";
import { Order } from "src/orders/entities/order.entity";
import { OrderPaginationDto } from "src/orders/dto/order-pagination.dto";
import { PaidOrderDto } from "src/orders/dto/paid-order.dto";

@Injectable()
export class OrderRepositoryPostgreSQL implements IOrderRepository {
    constructor(private readonly db: PostgreSQL) { }

    async getAll(pagination: OrderPaginationDto): Promise<Records> {
        const { page, limit, status } = pagination;
        const [total, data] = await Promise.all([
            this.db.orders.count({
                where: {
                    status
                }
            }),
            this.db.orders.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: {
                    status
                }
            })
        ])
        return {
            data: data.map(Order.fromObject),
            metadata: {
                total,
                page,
                lastPage: Math.ceil(total / limit)
            }
        };
    }
    async getOne(id: string): Promise<Order> {
        const item = await this.db.orders.findUnique({ where: { id } });
        if (!item) throw new RpcException(new NotFoundException(`The order with id #${id} not found`));
        return Order.fromObject(item);
    }

    async create(createDto: CreateOrderDto): Promise<Order> {
        const item = await this.db.orders.create({
            data: {
                ...createDto.getData,
                orderItems: {
                    createMany: {
                        data: createDto.items
                    }
                }
            }
        })
        return Order.fromObject(item);
    }

    async updateStatus(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
        await this.getOne(id);
        const updatedItem = await this.db.orders.update({
            where: {
                id,
            },
            data: {
                status: updateOrderDto.status
            }
        });
        return Order.fromObject(updatedItem);
    }

    async paidOrder(paidOrderDto: PaidOrderDto): Promise<void> {
        const { id, receipt } = paidOrderDto;
        const order = await this.getOne(id);
        if (!order.getPaid) {
            await this.db.orders.update({
                where: {
                    id
                },
                data: {
                    status: "COMPLETED",
                    paid: true,
                    paidAt: new Date(),
                    orderReceipts: {
                        create: {
                            receipt
                        }
                    }
                },
            })
        }
    }
}