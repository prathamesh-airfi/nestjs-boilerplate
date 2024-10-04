import {
  CallHandler,
  NestInterceptor,
  ExecutionContext,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface IClassConstructor {
  new (...args: any[]): object;
}

class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: IClassConstructor) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: IClassConstructor) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

export function Serialize(dto: IClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
