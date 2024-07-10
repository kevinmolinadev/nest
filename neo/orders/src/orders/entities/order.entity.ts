export enum OrderStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
}

interface Props {
    id: number,
    totalAmount: number,
    totalItems: number,
    status: OrderStatus,
    paid: boolean,
    paidAt?: Date,
    createdAt: Date,
    updatedAt: Date
}

export class Order {
    private readonly id: number;
    private readonly totalAmount: number;
    private readonly totalItems: number;
    private readonly status: OrderStatus;
    private readonly paid: boolean;
    private readonly paidAt: Date | null;
    private readonly createdAt: Date;
    private readonly updatedAt: Date;

    constructor(props: Props) {
        this.id = props.id;
        this.totalAmount = props.totalAmount;
        this.totalItems = props.totalItems;
        this.status = props.status;
        this.paid = props.paid;
        this.paidAt = props.paidAt || null;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }

    static fromObject(object: Record<keyof Props, any>) {
        object.totalAmount = Number(object.totalAmount);
        return new Order(object);
    }
}
