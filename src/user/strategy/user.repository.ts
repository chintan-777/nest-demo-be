import { AuthCredentials } from './../../auth/dto/auth-credential.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../interface/user.interface';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_MODEL')
    private authModel: Model<User>,
  ) {}

  async validateUser(authCredentials): Promise<boolean> {
    const { email } = await authCredentials;
    const user = await this.authModel.findOne({ email });
    if (user === null) {
      return false;
    } else {
      return true;
    }
  }

  async validateUserandPassword(
    authCredentials: AuthCredentials,
  ): Promise<any> {
    const { email, password } = authCredentials;

    const user = await this.authModel.findOne({ email });
    if (user === null) {
      throw new UnauthorizedException('Invalid credentials');
    } else {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        return user;
      } else {
        throw new BadRequestException('Invalid credentials');
      }
    }
  }
}
