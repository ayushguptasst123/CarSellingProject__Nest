import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from 'src/guards/passport-local.guard';
import { JwtGuard } from 'src/guards/jwt.guard';
import { User } from './entities/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

interface AuthRequest {
  user: User;
}

@Controller('passport-auth')
@Serialize(UserDto)
export class PassportAuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  login(@Req() request: AuthRequest) {
    console.log(request.user);
    return request.user;
  }

  @Get('me')
  @UseGuards(JwtGuard)
  getUserInfo(@Req() request: AuthRequest) {
    console.log(request.user);
    return request.user;
  }
}
