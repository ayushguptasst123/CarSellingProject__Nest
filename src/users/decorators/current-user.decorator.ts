import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../user.entity';

interface CustomRequest extends Request {
  currentUser?: User;
}

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    console.log(request.currentUser);
    return request.currentUser;
  },
);
