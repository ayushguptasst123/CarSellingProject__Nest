import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OauthAccessTokensService } from 'src/oauth-access-tokens/oauth-access-tokens.service';
import { UsersService } from '../users.service';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';

interface JwtPayload {
  sub: string;
  tokenId: string;
}

declare module 'express' {
  interface Request {
    user: User;
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-strategy') {
  constructor(
    private configService: ConfigService,
    private oauthAccessTokensService: OauthAccessTokensService,
    private userService: UsersService,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const tokenId = payload.tokenId;

    // verify token
    await this.oauthAccessTokensService.verifyToken(tokenId);

    // fetch user
    const user = await this.userService.findById(parseInt(payload.sub));
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
