import { Controller, Get, Param } from '@nestjs/common';
import { CommunityDocument } from 'src/model';
import { ComunityService } from './comunity.service';
import { BaseController } from '../../shared/base/base.controller';

@Controller('api/v1/comunity')
export class ComunityController extends BaseController<CommunityDocument>{
    constructor(private readonly comunityServices: ComunityService){
        super(comunityServices);   
    }
    
   @Get('view-details/:id')
    async getCategoryWithCourses(@Param('id') id: string) {
      return this.comunityServices.findCommunityWithDetails(id);
    }
}
