import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { OauthAccessTokensService } from 'src/oauth-access-tokens/oauth-access-tokens.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

declare module 'express' {
  interface Request {
    user: User;
  }
}

interface JwtPayload {
  sub: number;
  email: string;
}

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private oauthAccessTokensService: OauthAccessTokensService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer '))
      throw new UnauthorizedException();

    const token = authorization.split(' ')[1];

    try {
      const tokenPayload = await this.jwtService.verifyAsync<JwtPayload>(token);

      const tokenId = await this.oauthAccessTokensService.verifyToken(
        tokenPayload['tokenId'],
      );

      if (!tokenId) throw new UnauthorizedException();
      const user = await this.userService.findById(tokenPayload.sub);
      if (!user) throw new UnauthorizedException();

      request['user'] = user;
      request['tokenId'] = tokenId;

      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
}
