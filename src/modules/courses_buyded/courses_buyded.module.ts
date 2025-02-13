import { Module } from '@nestjs/common';
import { CoursesBuydedController } from './courses_buyded.controller';
import { CoursesBuydedService } from './courses_buyded.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseBuy, CourseBuySchema } from 'src/model';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: CourseBuy.name , schema: CourseBuySchema}]),
    JwtModule
  ],
  controllers: [CoursesBuydedController],
  providers: [CoursesBuydedService]
})
export class CoursesBuydedModule {}
