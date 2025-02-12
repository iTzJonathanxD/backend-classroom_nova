import { ExceptionFilter, Catch, InternalServerErrorException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch(InternalServerErrorException)
export class InternalServerErrorExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: 'Ocurrió un error interno en el servidor',
      error: 'Internal Server Error',
    });
  }
}
