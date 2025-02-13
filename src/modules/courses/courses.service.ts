import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { Course, CourseDocument } from 'src/model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CoursesService extends BaseService<CourseDocument>{
    constructor(@InjectModel(Course.name) private readonly coursesServices: Model<CourseDocument> ){
        super(coursesServices);
    }

     async findCoursesWithDetails(id: string): Promise<CourseDocument> {
         return this.findOneWithPopulate(id, ['docenteId', 'videos']);
 }
 
}
