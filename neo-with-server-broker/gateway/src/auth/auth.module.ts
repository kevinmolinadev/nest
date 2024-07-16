import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { NatsModule } from 'src/tranports';

@Module({
  imports: [NatsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
