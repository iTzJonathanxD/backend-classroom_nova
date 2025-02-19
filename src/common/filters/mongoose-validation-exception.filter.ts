import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from 'src/modules/logger/logger.service';

@Catch(BadRequestException)
export class MongooseValidationExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.getResponse();

    this.logger.error(`[BadRequestException] Validation failed - Message: ${JSON.stringify(message)}`, exception.stack);

    response.status(status).json({
      statusCode: status,
      message: 'Error de validación en los datos proporcionados',
      details: message,
    });
  }
}
