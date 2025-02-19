import { ExceptionFilter, Catch, InternalServerErrorException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from 'src/modules/logger/logger.service';

@Catch(InternalServerErrorException)
export class InternalServerErrorExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    this.logger.error('[InternalServerErrorException] Internal server error', exception.stack);

    response.status(status).json({
      statusCode: status,
      message: 'Ocurrió un error interno en el servidor',
      error: 'Internal Server Error',
    });
  }
}
