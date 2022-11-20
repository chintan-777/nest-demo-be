import { UserRepository } from './../user/strategy/user.repository';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/user/interface/user.interface';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MODEL')
    private authModel: Model<User>,
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private eventEmitter: EventEmitter2,
  ) {}

  async signUp(reqBody: CreateAuthDto): Promise<User> {
    const { password, confirmPassword } = reqBody;
    if (password === confirmPassword) {
      const userExits = await this.userRepository.validateUser(reqBody);

      if (!userExits) {
        const user = new this.authModel(reqBody);
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();

        return user;
      } else {
        throw new ConflictException('user already exist');
      }
    } else {
      throw new BadRequestException('password mismatched');
    }
  }
}
