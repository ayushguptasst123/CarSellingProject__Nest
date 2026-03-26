import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user-dto';
import { SerializerInterceptor } from 'src/interceptors/serialize.interceptor';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseInterceptors(SerializerInterceptor)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('Handler is running');
    const user = await this.userService.findOne(parseInt(id));
    if (!user) throw new NotFoundException('user not found');
    return user;
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
