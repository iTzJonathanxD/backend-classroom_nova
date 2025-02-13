import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { CourseBuy, CourseBuyDocument } from 'src/model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CoursesBuydedService extends BaseService<CourseBuyDocument> {
    constructor(@InjectModel(CourseBuy.name) private readonly coyrsebuydedservice: Model<CourseBuyDocument>){
        super(coyrsebuydedservice);
    }
     async findUserWithDetails(id: string): Promise<CourseBuyDocument> {
         return this.findOneWithPopulate(id, ['referidosId']);
 }
}
