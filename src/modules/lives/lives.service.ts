import { Injectable } from '@nestjs/common';
import { LiveDocument, Live } from 'src/model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../../shared/base/base.service';

@Injectable()
export class LivesService extends BaseService<LiveDocument> {
  constructor(@InjectModel(Live.name) private readonly livesModel: Model<LiveDocument>) {
    super(livesModel);
  }
}
