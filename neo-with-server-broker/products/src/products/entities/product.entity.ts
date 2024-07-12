interface Props {
    id: number
    name: string
    description: string
    price: number
    available: boolean
    createdAt: Date
    updatedAt: Date
}

export class Product {
    private readonly id: number;
    private readonly name: string;
    private readonly description: string;
    private readonly price: number;
    private readonly available: boolean;
    private readonly createdAt: Date;
    private readonly updatedAt: Date;

    constructor(props: Props) {
        this.id = props.id
        this.name = props.name
        this.description = props.description
        this.price = props.price
        this.available = props.available
        this.createdAt = props.createdAt
        this.updatedAt = props.updatedAt
    }


    static fromObject(object: Props) {
        return new Product(object);
    }
}
