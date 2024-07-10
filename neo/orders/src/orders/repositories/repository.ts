import { PaginationDto } from "src/shared/dto/pagination.dto";
import { Order } from "../entities/order.entity";
import { CreateOrderDto } from "../dto/create-order.dto";
import { UpdateOrderDto } from "../dto/update-order.dto";
export const ORDER_REPOSITORY_PROVIDER = "ORDER_REPOSITORY"

export type Records = {
    data: Order[],
    metadata: {
        total: number,
        page: number,
        lastPage: number
    }
}

export interface IOrderRepository {
    getAll(pagination: PaginationDto): Promise<Records>,
    getOne(id: string): Promise<Order>,
    create(createDto: CreateOrderDto): Promise<Order>
    updateStatus(id: string, updateOrderDto: UpdateOrderDto): Promise<Order>
}