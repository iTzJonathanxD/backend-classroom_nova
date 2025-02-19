// src/logger/logger.service.ts
import { Injectable } from '@nestjs/common';
import { formatLogMessage } from '../../common/utils/logger.utils';

@Injectable()
export class LoggerService {
  log(message: string, context: string = 'App') {
    console.log(formatLogMessage(message, context, 'info'));
  }

  error(message: string, trace: string, context: string = 'App') {
    console.error(formatLogMessage(`${message} - Trace: ${trace}`, context, 'error'));
  }

  warn(message: string, context: string = 'App') {
    console.warn(formatLogMessage(message, context, 'warn'));
  }

  debug(message: string, context: string = 'App') {
    console.debug(formatLogMessage(message, context, 'debug'));
  }

  verbose(message: string, context: string = 'App') {
    console.log(formatLogMessage(message, context, 'verbose'));
  }
}
