import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtGuard } from 'src/guards/jwt.guard';
import type { Request } from 'express';
import { User } from './entities/user.entity';

interface SessionData {
  userId?: number;
}

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('whoami')
  @UseGuards(JwtGuard)
  whoAmI(@Req() request: Request) {
    return request.user;
  }

  @Patch()
  modifyUser(@CurrentUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.modifyViaLogin(user, updateUserDto);
  }

  @Post('/signup')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Session() session: SessionData,
  ) {
    const user = await this.authService.signUp(
      createUserDto.email,
      createUserDto.password,
    );

    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  @HttpCode(200)
  async signIn(
    @Body() createUserDto: CreateUserDto,
    @Session() session: SessionData,
  ) {
    const user = await this.authService.signIn(
      createUserDto.email,
      createUserDto.password,
    );
    session.userId = user.id;
    return user;
  }

  @Post('signout')
  signOut(@Session() session: SessionData) {
    session.userId = undefined;
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
