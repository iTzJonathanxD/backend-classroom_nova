import { Controller, Get, Param } from '@nestjs/common';
import { BaseController } from '../base.controller';
import { CategoryCourseDocument } from 'src/model';
import { CategoryCoursesService } from './category_courses.service';

@Controller('api/v1/category-courses')
export class CategoryCoursesController extends BaseController<CategoryCourseDocument>{
    constructor(private readonly categoryCourses: CategoryCoursesService){
        super(categoryCourses);
    }

    @Get('view-courses/:id')
    async getCategoryWithCourses(@Param('id') id: string) {
      return this.categoryCourses.findCategoryWithCourses(id);
    }
}
