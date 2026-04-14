import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from 'src/guards/passport-local.guard';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

interface AuthRequest {
  user: User;
}

@Controller('passport-auth')
@Serialize(UserDto)
export class PassportAuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  async login(@Req() request: AuthRequest) {
    const tokenPayload = {
      sub: request.user.id,
      email: request.user.email,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);
    return { accessToken, ...request.user };
  }

  @Get('me')
  getUserInfo() {
    throw new NotImplementedException();
  }
}
