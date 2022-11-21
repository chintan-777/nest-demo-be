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
import { AuthCredentials } from './dto/auth-credential.dto';

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

  async signIn(reqBody: AuthCredentials): Promise<any> {
    const user = await this.userRepository.validateUserandPassword(reqBody);
    return user;
  }

  async createToken(user: User) {
    const payload: User = user;
    const accessToken = await this.jwtService.sign(payload.toJSON());
    return accessToken;
  }

  async getUser(email: string): Promise<User> {
    const user = this.authModel.findOne({ email });

    return user.select({ password: 0 });
  }
}
