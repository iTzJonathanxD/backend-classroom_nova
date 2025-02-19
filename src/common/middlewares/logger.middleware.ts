import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { formatLogMessage } from '../utils/logger.utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const message = `Request to ${req.method} ${req.url}`;
    const context = 'LoggerMiddleware';
    const level = 'info'; 

    console.log(formatLogMessage(message, context, level));

    next();
  }
}
