import { ExceptionFilter, Catch, NotFoundException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from 'src/modules/logger/logger.service';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // Log de error
    this.logger.error(`[NotFoundException] Resource not found`, exception.stack);

    response.status(status).json({
      statusCode: status,
      message: 'Recurso no encontrado',
      error: 'Not Found',
    });
  }
}
