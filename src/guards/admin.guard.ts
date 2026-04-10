import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { CustomRequest } from '../users/decorators/current-user.decorator';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<CustomRequest>();

    if (!request.currentUser)
      throw new UnauthorizedException('Please Login Again');
    return request.currentUser.admin;
  }
}
