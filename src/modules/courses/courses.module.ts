import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/model';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema}]),
    JwtModule
  ],
  providers: [CoursesService],
  controllers: [CoursesController]
})
export class CoursesModule {}
