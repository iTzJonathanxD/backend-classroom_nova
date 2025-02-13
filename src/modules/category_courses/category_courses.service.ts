import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { CategoryCourse, CategoryCourseDocument } from 'src/model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoryCoursesService extends BaseService<CategoryCourseDocument>{
    constructor(@InjectModel(CategoryCourse.name) private readonly categoryservice: Model<CategoryCourseDocument>){
        super(categoryservice);
    }
    async findCategoryWithCourses(id: string): Promise<CategoryCourseDocument> {
        return this.findOneWithPopulate(id, ['cursosId']); 
      }

}
