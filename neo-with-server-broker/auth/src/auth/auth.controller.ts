import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { ControllerPattern } from 'src/patterns/controller.pattern';
import { CreateUserDto } from './dto/create.dto';
import { LoginUserDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern(ControllerPattern.create)
  create(@Payload() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @MessagePattern(ControllerPattern.login)
  login(@Payload() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @MessagePattern(ControllerPattern.verify)
  verify(@Payload() token: string) {
    return this.authService.verify(token);
  }
}
