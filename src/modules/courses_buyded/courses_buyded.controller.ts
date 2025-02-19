import { Controller, Get, Param } from '@nestjs/common';
import { CourseBuyDocument } from 'src/model';
import { CoursesBuydedService } from './courses_buyded.service';
import { BaseController } from '../../shared/base/base.controller';

@Controller('api/v1/courses-buyded')
export class CoursesBuydedController extends BaseController<CourseBuyDocument>{
    constructor(private readonly coursebuyded:  CoursesBuydedService){
        super(coursebuyded);
    }
    @Get('view-details/:id')
    async getUserDetails(@Param('id') id: string){
        return this.coursebuyded.findUserWithDetails(id);
    }
}
