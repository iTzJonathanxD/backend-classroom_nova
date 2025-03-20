import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { MongooseModule } from '@nestjs/mongoose';  
import { Payments,PaymentSchema } from 'src/model';
import { JwtModule } from '../jwt/jwt.module';
import { IaGoogleModule } from '../../feat/ia-google/ia-google.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payments.name, schema: PaymentSchema }]),  
    JwtModule,
    IaGoogleModule
  ],
  providers: [PaymentsService],
  controllers: [PaymentsController]
})
export class PaymentsModule {}
