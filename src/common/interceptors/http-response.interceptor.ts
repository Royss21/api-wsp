import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResponseDto } from 'src/shared/dtos/output';

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
  constructor() {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response: ResponseDto<any> = {
          ok: true,
          data,
          message: '',
        };

        return response;
      }),
    );
  }
}
