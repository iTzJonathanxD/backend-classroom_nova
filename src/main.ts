import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/env.config';
import { NotFoundExceptionFilter, InternalServerErrorExceptionFilter, HttpExceptionFilter, MongooseValidationExceptionFilter } from './common/filters/index';
import { LoggerService } from './modules/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [envs.corsOrigin],  
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],  
    allowedHeaders: ['Content-Type', 'Authorization'],  
  });

  const logger = app.get(LoggerService); 

  app.useGlobalFilters(
    new NotFoundExceptionFilter(logger),  
    new InternalServerErrorExceptionFilter(logger), 
    new HttpExceptionFilter(logger), 
    new MongooseValidationExceptionFilter(logger), 
  );

  app.useLogger(app.get(LoggerService)); 

  await app.listen(envs.port);
}

bootstrap();
