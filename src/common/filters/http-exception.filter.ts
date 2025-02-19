import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from 'src/modules/logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.getResponse();

    this.logger.error(`[HttpException] Status: ${status} - Message: ${JSON.stringify(message)}`, exception.stack);

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
