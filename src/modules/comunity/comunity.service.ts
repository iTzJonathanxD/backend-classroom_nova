import { Injectable } from '@nestjs/common';
import { BaseService } from '../../shared/base/base.service';
import { Community, CommunityDocument } from 'src/model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ComunityService extends BaseService<CommunityDocument>{
    constructor(@InjectModel(Community.name) private readonly comunityService: Model<CommunityDocument>){
        super(comunityService)
    }

    async findCommunityWithDetails(id: string): Promise<CommunityDocument> {
        const comunity = await this.findOneWithPopulate(id, ['videoId', 'alumnoId']);
        return comunity.data as CommunityDocument;
      }

      
}
