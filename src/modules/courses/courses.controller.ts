import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { BaseController } from '../base.controller';
import { CourseDocument } from 'src/model';

@Controller('api/v1/courses')
export class CoursesController extends BaseController<CourseDocument> {
    constructor(private readonly coursesService: CoursesService,
    ){
        super(coursesService);
    }
    @Get('view-details/:id')
    async getCategoryWithCourses(@Param('id') id: string) {
         return this.coursesService.findCoursesWithDetails(id);
      }
}
