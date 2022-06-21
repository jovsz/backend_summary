import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { generateJwtToken } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/index.entities';
import { UserService } from './user/user.service';

@Global()
@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, generateJwtToken, UserService],
  exports: [AuthService, UserService],
})
export class AuthModule {}
