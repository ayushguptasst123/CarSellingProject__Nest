import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user-dto';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  @Get()
  findAllUsers() {
    return this.userService.find();
  }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
    this.userService.create(body.email, body.password);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(parseInt(id), data);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(Number(id));
  }
}
