import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PassportLocalGuard } from 'src/guards/passport-local.guard';
import { JwtGuard } from 'src/guards/jwt.guard';
import { User } from './entities/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { OauthAccessTokensService } from 'src/oauth-access-tokens/oauth-access-tokens.service';

interface AuthRequest {
  user: User;
  tokenId: string;
}

@Controller('passport-auth')
@Serialize(UserDto)
export class PassportAuthController {
  constructor(private oauthAccessTokensService: OauthAccessTokensService) {}

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

  @Get('logout')
  @UseGuards(JwtGuard)
  logoutUser(@Req() request: AuthRequest) {
    return this.oauthAccessTokensService.disableToken(
      request.tokenId,
      request.user,
    );
  }
}
