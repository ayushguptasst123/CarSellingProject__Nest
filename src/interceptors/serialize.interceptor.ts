import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';
import { catchError, map, Observable } from 'rxjs';

interface ClassConstructor {
  new (...args: any[]): any;
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data: unknown) => {
        if (!this.dto) return data;

        console.log(`Running before the response send back`);
        const response = context.switchToHttp().getResponse<Response>();

        return {
          success: true,
          statusCode: response.statusCode.toString(),
          payload: plainToInstance(this.dto, data, {
            excludeExtraneousValues: true,
            //If we don't use `excludeExtraneousValues` then it can't transform to the given dto
          }),
        };
      }),
      catchError((err) => {
        console.log('executed');
        throw err;
      }),
    );
  }
}
