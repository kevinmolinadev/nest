import { CreateUserDto } from "src/auth/dto/create.dto";
import { UserEntity } from "src/entities/user.entity";

export const USER_REPOSITORY = "USER_REPOSITORY";

export interface FilterUser {
    username: string
    email: string,
    id: string
}

export interface IUserRepository {
    create(createUserDto: CreateUserDto): Promise<UserEntity>
    getOne(search: Partial<FilterUser>): Promise<UserEntity>
}