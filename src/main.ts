import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config'
import { NotFoundExceptionFilter } from './utils/index';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new NotFoundExceptionFilter)
  await app.listen(envs.port);
}
bootstrap();
