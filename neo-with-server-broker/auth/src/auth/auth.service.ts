import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create.dto';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository, USER_REPOSITORY } from 'src/interfaces/user-repository.interface';
import { BcryptService } from 'src/services/bcrypt.service';
import { Payload, RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.bcryptService.generateHash(createUserDto.password);
    const user = await this.userRepository.create(createUserDto);
    const token = this.jwtService.sign({ id: user.getId });
    return {
      user: user.getData,
      token
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.getOne({ username: loginUserDto.username });
    const isMatch = await this.bcryptService.compareHash(loginUserDto.password, user.getPassword);
    if (!isMatch) throw new RpcException(new BadRequestException("the password is incorrect"))
    const token = this.jwtService.sign({ id: user.getId });
    return { token }
  }

  verify(token: string) {
    try {
      return this.jwtService.verify(token)
    } catch (error) {
      throw new RpcException(new UnauthorizedException(error.message));
    };
  }
}
