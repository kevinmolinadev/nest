interface Props {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export class UserEntity {
    private readonly id: string;
    private readonly name: string;
    private readonly username: string;
    private readonly email: string
    private readonly password: string
    private readonly createdAt: Date
    private readonly updatedAt: Date

    constructor(props: Props) {
        this.id = props.id;
        this.name = props.name;
        this.username = props.username;
        this.email = props.email;
        this.password = props.password;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }

    get getId() {
        return this.id;
    }

    get getPassword() {
        return this.password;
    }

    get getData() {
        const { password, ...data } = this;
        return data;
    }

    static fromObject(object: Record<string, any>) {
        return new UserEntity(object as Props);
    }
}