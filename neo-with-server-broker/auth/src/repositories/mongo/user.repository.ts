import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { CreateUserDto } from "src/auth/dto/create.dto";
import { UserModel } from "src/data/mongo/models/user.model";
import { UserEntity } from "src/entities/user.entity";
import { IUserRepository, FilterUser } from "src/interfaces/user-repository.interface";

@Injectable()
export class UserMongoRepository implements IUserRepository {

    private async getUserWithEmail(filter: Partial<FilterUser>) {
        const user = await UserModel.findOne({ $or: Object.entries(filter).map(([key, value]) => ({ [key]: value })) })
        if (user) throw new RpcException(new BadRequestException(`user with email/username already exist`));
    }

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        await this.getUserWithEmail({ email: createUserDto.email, username: createUserDto.username });
        const newUser = await UserModel.create(createUserDto);
        return UserEntity.fromObject(newUser)
    }

    async getOne(filter: Partial<FilterUser>): Promise<UserEntity> {
        const user = await UserModel.findOne({ $or: Object.entries({ ...filter, _id: filter.id }).map(([key, value]) => ({ [key]: value })) })
        if (!user) throw new RpcException(new NotFoundException(`user not found`));
        return UserEntity.fromObject(user);
    }

}