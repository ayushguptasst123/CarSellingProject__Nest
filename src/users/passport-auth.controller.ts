import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { PassportLocalGuard } from 'src/guards/passport-local.guard';
import { JwtGuard } from 'src/guards/jwt.guard';
import { User } from './entities/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { OauthAccessTokensService } from 'src/oauth-access-tokens/oauth-access-tokens.service';
import type { Request } from 'express';
import { OAuthAccessToken } from 'src/oauth-access-tokens/oauth-access-token.entity';

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
  login(@Req() request: AuthRequest): User {
    console.log(request.user);
    return request.user;
  }

  @Get('me')
  @UseGuards(JwtGuard)
  getUserInfo(@Req() request: AuthRequest): User {
    console.log(request.user);
    return request.user;
  }

  @Get('greeting')
  @UseGuards(JwtGuard)
  greeting(@Req() request: AuthRequest) {
    console.log(request.user);
    return {
      greeting: 'Hello world',
    };
  }

  @Get('logout')
  @UseGuards(JwtGuard)
  logoutUser(@Req() request: Request): Promise<OAuthAccessToken> {
    const header = request.headers.authorization?.split(' ')[1];
    if (!header) throw new UnauthorizedException();
    return this.oauthAccessTokensService.disableToken(header, request.user);
  }
}
