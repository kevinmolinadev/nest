import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { Services } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AuthPattern } from './pattern';
import { CreateUserDto } from './dto/create.dto';
import { catchError } from 'rxjs';
import { LoginUserDto } from './dto/login.dto';
import { User } from './decorators/user.decorator';
import { AuthGuard } from './guards/token.guard';

@Controller('auth')
export class AuthController {
  constructor(@Inject(Services.Nats) private client: ClientProxy) { }

  @Post("register")
  register(@Body() createUserDto: CreateUserDto) {
    return this.client.send(AuthPattern.create, createUserDto)
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));
  }

  @Post("login")
  login(@Body() loginUser: LoginUserDto) {
    return this.client.send(AuthPattern.login, loginUser)
      .pipe(catchError(e => {
        throw new RpcException(e)
      }));
  }

  @Get("verify")
  @UseGuards(AuthGuard)
  verify(@User() user: any) {
    return user;
  }
}
