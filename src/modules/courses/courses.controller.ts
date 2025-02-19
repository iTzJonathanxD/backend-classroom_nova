import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseDocument } from 'src/model';
import { BaseController } from '../../shared/base/base.controller';

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
