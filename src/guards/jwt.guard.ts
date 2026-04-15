import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
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
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer '))
      throw new UnauthorizedException();

    const token = authorization.split(' ')[1];

    try {
      const tokenPayload = await this.jwtService.verifyAsync<JwtPayload>(token);

      const user = await this.userService.findById(tokenPayload.sub);
      if (!user) throw new UnauthorizedException();

      request['user'] = user;

      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
}
