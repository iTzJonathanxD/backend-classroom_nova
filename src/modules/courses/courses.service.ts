import { Injectable } from '@nestjs/common';
import { BaseService } from '../../shared/base/base.service';
import { Course, CourseDocument } from 'src/model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService extends BaseService<CourseDocument>{
    constructor(@InjectModel(Course.name) private readonly coursesServices: Model<CourseDocument> ){
        super(coursesServices);
    }

     async findCoursesWithDetails(id: string): Promise<CourseDocument> {
         const response = await this.findOneWithPopulate(id, ['docenteId', 'videos']);
         return response.data as CourseDocument;
 }
 
}
