// src/common/interceptors/logging.interceptor.ts
import { Injectable, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { LOG_METHOD } from '../../common/decorators/log.decorator';
import { LoggerService } from 'src/modules/logger/logger.service';

@Injectable()
export class LoggingInterceptor {
  constructor(
    private readonly logger: LoggerService,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isLogEnabled = this.reflector.get<boolean>(
      LOG_METHOD,
      context.getHandler(),
    );
    
    if (isLogEnabled) {
      const methodName = context.getHandler().name;
      this.logger.log(`Executing method: ${methodName}`);
    }

    return next.handle();
  }
}
