import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

// The implementation of NestInterceptor is optional
export class SerializerInterceptor implements NestInterceptor {
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
