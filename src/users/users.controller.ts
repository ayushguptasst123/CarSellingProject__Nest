import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create.user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update.user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { SigninDto } from './dtos/signin.dto';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('Handler is running');
    const user = await this.userService.findOne(id);
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
    return this.authService.signup(body.email, body.password, body.gender);
  }

  @Post('/signin')
  verifyUser(@Body() body: SigninDto) {
    console.log(body);
    return this.authService.signin(body.email, body.password);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
