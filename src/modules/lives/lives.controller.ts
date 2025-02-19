import { Controller } from '@nestjs/common';
import { BaseController } from '../../shared/base/base.controller';
import { LivesService } from './lives.service';
import { LiveDocument } from 'src/model';

@Controller('api/v1/lives')
export class LivesController extends BaseController<LiveDocument> {
  constructor(
    private readonly livesService: LivesService,
  ) {
    super(livesService); 
  }
}
