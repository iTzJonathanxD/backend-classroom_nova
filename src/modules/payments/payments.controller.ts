import { Controller } from '@nestjs/common';
import { BaseController } from '../base.controller';
import { PaymentsService } from './payments.service';
import { PaymentDocument } from 'src/model';

@Controller('api/v1/payments')
export class PaymentsController extends BaseController<PaymentDocument> {
  constructor(
    private readonly productService: PaymentsService,
  ) {
    super(productService); 
  }
}
