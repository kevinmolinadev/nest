import { PaginationDto } from "src/shared/dto/pagination.dto";
import { OrderItem, PropsOrderItem } from "../entities/order-item";
import { CreateOrderItemDto } from "../dto/create-order-item.dto";

export const ORDER_ITEM_REPOSITORY_PROVIDER = "ORDER_ITEM_REPOSITORY"

export type Records = {
    data: OrderItem[],
    metadata: {
        total: number,
        page: number,
        lastPage: number
    }
}

export interface FilterOrderItem extends Partial<PropsOrderItem> { }

export interface IOrderItemRepository {
    getAll(pagination: PaginationDto, filter?: FilterOrderItem): Promise<Records>,
    getOne(id: string): Promise<OrderItem>,
    create(createDto: CreateOrderItemDto): Promise<OrderItem>
}