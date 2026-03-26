import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

// The implementation of NestInterceptor is optional
export class SerializerInterceptor implements NestInterceptor {
  // This method is called automatically
  intercept(
    context: ExecutionContext, //Inform on the incoming request
    handler: CallHandler<any>, //kind of a reference to the request handler in our controller
  ): Observable<any> {
    // Run something before a request is handled
    // by the request handler
    console.log("I'm running before the handler");

    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the response is send out
        console.log("I'm running before response is sent out", data);
        return data;
      }),
    );
  }
}
