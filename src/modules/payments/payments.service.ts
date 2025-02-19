import { Injectable } from '@nestjs/common';
import { Payments, PaymentDocument } from 'src/model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../../shared/base/base.service';

@Injectable()
export class PaymentsService extends BaseService<PaymentDocument> {
  constructor(@InjectModel(Payments.name) private readonly paymentsModel: Model<PaymentDocument>) {
    super(paymentsModel);
  }
}
