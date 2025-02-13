import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { NotFoundExceptionFilter, InternalServerErrorExceptionFilter, HttpExceptionFilter, MongooseValidationExceptionFilter } from './utils/index';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:8080'],  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  
    allowedHeaders: ['Content-Type', 'Authorization'],  
  });

  app.useGlobalFilters(
    new NotFoundExceptionFilter(),
    new InternalServerErrorExceptionFilter(),
    new HttpExceptionFilter(),
    new MongooseValidationExceptionFilter(),
  );

  await app.listen(envs.port);
}
bootstrap();
