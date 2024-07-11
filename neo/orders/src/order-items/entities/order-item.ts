export interface PropsOrderItem {
    id: string,
    idProduct: number,
    quantity: number,
    idOrder: string,
}

export class OrderItem {
    private readonly id: string;
    private readonly idProduct: number;
    private readonly quantity: number;
    private readonly idOrder: string;

    constructor(props: PropsOrderItem) {
        this.id = props.id;
        this.idProduct = props.idProduct;
        this.quantity = props.quantity;
        this.idOrder = props.idOrder;
    }

    static fromObject(object: Record<keyof PropsOrderItem, any>) {
        return new OrderItem(object);
    }
}
