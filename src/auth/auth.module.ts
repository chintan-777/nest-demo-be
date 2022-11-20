import { UserRepository } from './../user/strategy/user.repository';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import 'dotenv/config';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from './auth.controller';
import { authProviders } from './provider/auth.provider';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: 60000,
      },
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ...authProviders, UserRepository],
})
export class AuthModule {}
