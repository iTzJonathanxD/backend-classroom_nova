import { Injectable } from '@nestjs/common';
import { BaseService } from '../base.service';
import { Payments,PaymentDocument } from 'src/model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PaymentsService extends BaseService<PaymentDocument> {
  constructor(@InjectModel(Payments.name) private readonly paymanetsModel: Model<PaymentDocument>) {
    super(paymanetsModel);
  }
}
