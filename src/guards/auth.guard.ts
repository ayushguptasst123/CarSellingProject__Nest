import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.session || !request.session.userId) {
      return false;
    }

    return true;
  }
}
