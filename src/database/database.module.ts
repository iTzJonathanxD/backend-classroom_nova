import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from '../config/env.config';
import { LoggerService } from 'src/modules/logger/logger.service';
import { LoggerModule } from 'src/modules/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(envs.mongoUri || 'mongodb://localhost:27017/mydb', {
    }),
    LoggerModule
  ],
})
export class DatabaseModule {
    constructor(private readonly logger: LoggerService) {
      this.logger.log('[Database] MongoDB connection established');
    }
}