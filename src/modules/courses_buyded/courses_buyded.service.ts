import { Injectable } from '@nestjs/common';
import { BaseService } from '../../shared/base/base.service';
import { CourseBuy, CourseBuyDocument } from 'src/model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CoursesBuydedService extends BaseService<CourseBuyDocument> {
    constructor(@InjectModel(CourseBuy.name) private readonly coyrsebuydedservice: Model<CourseBuyDocument>){
        super(coyrsebuydedservice);
    }
     async findUserWithDetails(id: string): Promise<CourseBuyDocument> {
         const response = await this.findOneWithPopulate(id, ['referidosId']);
         return response.data as CourseBuyDocument;
 }
}
