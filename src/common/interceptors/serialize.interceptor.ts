import {
  CallHandler,
  NestInterceptor,
  UseInterceptors,
  ExecutionContext,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';

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

export const Serialize = (dto: IClassConstructor) =>
  UseInterceptors(new SerializeInterceptor(dto));
