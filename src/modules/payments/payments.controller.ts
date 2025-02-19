import { Controller } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentDocument } from 'src/model';
import { BaseController } from '../../shared/base/base.controller';

@Controller('api/v1/payments')
export class PaymentsController extends BaseController<PaymentDocument> {
  constructor(
    private readonly productService: PaymentsService,
  ) {
    super(productService); 
  }
}
