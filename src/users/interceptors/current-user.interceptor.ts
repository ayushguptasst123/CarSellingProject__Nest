import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { CustomRequest } from '../decorators/current-user.decorator';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const userId = (request.session as { userId?: number })?.userId;

    if (userId) {
      const user = await this.userService.findOne(userId);
      console.log(user);
      request.currentUser = user;
    }

    return next.handle();
  }
}
