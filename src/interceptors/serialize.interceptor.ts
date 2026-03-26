import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

// This is the helper method to restrict user to enter only class value to the param
interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializerInterceptor(dto));
}

// The implementation of NestInterceptor is optional
class SerializerInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  // This method is called automatically
  intercept(
    context: ExecutionContext, //Inform on the incoming request
    handler: CallHandler<any>, //kind of a reference to the request handler in our controller
  ): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
