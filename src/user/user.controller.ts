import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.findUser(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() userBody: User) {
    return this.userService.updateUser(id, userBody);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
