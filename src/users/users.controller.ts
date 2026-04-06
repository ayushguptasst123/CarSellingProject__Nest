import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

interface AppSession {
  color?: string;
}
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: AppSession) {
    session.color = color;
  }

  @Get('/colors')
  getColor(@Session() session: AppSession) {
    return session.color;
  }

  @Post('/signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto.email, createUserDto.password);
  }

  @Post('/signin')
  signIn(@Body() createUserDto: CreateUserDto) {
    return this.authService.signIn(createUserDto.email, createUserDto.password);
  }

  @Get(':id')
  findOneUser(@Param('id') id: string) {
    console.log('Handler is running');
    return this.usersService.findOne(Number(id));
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(parseInt(id), updateUserDto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @Delete('')
  deleteUser(@Query('email') email: string) {
    return this.usersService.delete(email);
  }
}
