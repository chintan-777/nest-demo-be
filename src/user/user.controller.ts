import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  addUser(@Body() userBody: User) {
    return this.userService.createUser(userBody);
  }

  @Get()
  getUser() {
    return this.userService.getUsers();
  }
}
