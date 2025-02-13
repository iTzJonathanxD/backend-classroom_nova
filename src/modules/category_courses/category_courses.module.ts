import { Module } from '@nestjs/common';
import { CategoryCoursesController } from './category_courses.controller';
import { CategoryCoursesService } from './category_courses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryCourse, CategoryCourseSchema } from 'src/model';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name: CategoryCourse.name, schema: CategoryCourseSchema}]),
    JwtModule
  ],
  controllers: [CategoryCoursesController],
  providers: [CategoryCoursesService]
})
export class CategoryCoursesModule {}
