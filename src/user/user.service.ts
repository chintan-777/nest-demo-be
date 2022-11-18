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

  async updateUser(id: string, user: User) {
    let localUser = await this.findUser(id);
    if (!localUser) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    localUser = { ...localUser._doc, ...user };
    try {
      let { _id, ...data } = localUser;
      await this.userModal.updateOne({ _id: _id }, localUser);
      return localUser;
    } catch (error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  async findUser(id: string) {
    let user;
    try {
      user = await this.userModal.findById(id);
      return user;
    } catch (err) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async deleteUser(id: string) {
    let localUser;
    try {
      localUser = await this.userModal.findByIdAndDelete(id);
      return localUser;
    } catch (err) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
