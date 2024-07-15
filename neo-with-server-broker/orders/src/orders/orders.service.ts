import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { IOrderRepository, ORDER_REPOSITORY_PROVIDER } from './repositories/repository';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ProductPattern, Services } from 'src/config';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { firstValueFrom } from 'rxjs';
import { CreateOrderItemDto, OrderItemService } from 'src/order-items';
import { PaidOrderDto } from './dto/paid-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderItemService: OrderItemService,
    @Inject(ORDER_REPOSITORY_PROVIDER) private readonly orderRepository: IOrderRepository,
    @Inject(Services.Nats) private readonly client: ClientProxy
  ) { }

  private async getProductsData(items: CreateOrderItemDto[]): Promise<Record<string, any>[]> {
    const [productIds, quantities] = items.reduce((acc, item) => {
      const updatedProductIds = [...acc[0], item.idProduct];
      const updatedQuantities = { ...acc[1], [item.idProduct]: item.quantity };

      return [
        updatedProductIds,
        updatedQuantities
      ]
    }, [[], {}]) as [number[], { [key: string]: number }];

    const data: any[] = await firstValueFrom(this.client.send(ProductPattern.validateProducts, productIds));
    return data.map(({ id, name, price }) => ({ id, name, price, quantity: quantities[id] }));
    return []
  }

  async create(createOrderDto: CreateOrderDto) {
    try {
      const productsData = await this.getProductsData(createOrderDto.items);
      const totalAmount = productsData.reduce((acc, item) => acc + (item.price * item.quantity), 0);

      createOrderDto.totalItems = productsData.length;
      createOrderDto.totalAmount = totalAmount;

      const order = await this.orderRepository.create(createOrderDto)

      return {
        ...order,
        orderItems: productsData
      }
    } catch (error) {
      throw new RpcException(error);
    }
  }

  findAll(pagination: OrderPaginationDto) {
    return this.orderRepository.getAll(pagination);
  }

  async findOne(id: string) {
    const { data } = await this.orderItemService.findAll(undefined, { idOrder: id })
    const orderItems = await this.getProductsData(data as []);
    const order = await this.orderRepository.getOne(id);
    return {
      ...order,
      orderItems
    }
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.updateStatus(id, updateOrderDto);
  }

  paidOrder(paidOrderDto: PaidOrderDto) {
    return this.orderRepository.paidOrder(paidOrderDto);
  }

}
