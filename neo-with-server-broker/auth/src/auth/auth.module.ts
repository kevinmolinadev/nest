import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { DataModule } from 'src/data/data.module';
import { USER_REPOSITORY } from 'src/interfaces/user-repository.interface';
import { UserMongoRepository } from 'src/repositories/mongo/user.repository';
import { Envs } from 'src/config';
import { BcryptService } from 'src/services/bcrypt.service';

@Module({
  imports: [
    DataModule,
    JwtModule.register({
      global: true,
      secret: Envs.JWT_SECRET,
      signOptions: {
        expiresIn: Envs.JWT_EXPIRES_IN,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, {
      provide: USER_REPOSITORY,
      useClass: UserMongoRepository,
    },
    BcryptService,
  ],
})
export class AuthModule { }
