import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModal: Model<User>) {}

  async createUser(user: User) {
    try {
      const newUser = new this.userModal({ ...user });
      await newUser.save();
      return newUser;
    } catch (err) {
      throw new HttpException('Enter proper userdata', HttpStatus.BAD_REQUEST);
    }
  }

  async getUsers() {
    let users;
    try {
      users = await this.userModal.find({});
      return users;
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
