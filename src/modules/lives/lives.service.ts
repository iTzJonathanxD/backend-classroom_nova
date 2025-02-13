import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { LiveDocument, Live } from 'src/model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LivesService extends BaseService<LiveDocument> {
  constructor(@InjectModel(Live.name) private readonly livesModel: Model<LiveDocument>) {
    super(livesModel);
  }
}
