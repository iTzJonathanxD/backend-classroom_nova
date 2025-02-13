import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from '../config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(envs.mongoUri || 'mongodb://localhost:27017/mydb', {
        }),
    ],
})
export class DatabaseModule {}
