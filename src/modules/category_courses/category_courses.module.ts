import { Module } from '@nestjs/common';
import { CategoryCoursesController } from './category_courses.controller';
import { CategoryCoursesService } from './category_courses.service';

@Module({
  controllers: [CategoryCoursesController],
  providers: [CategoryCoursesService]
})
export class CategoryCoursesModule {}
