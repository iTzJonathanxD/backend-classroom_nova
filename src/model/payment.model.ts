import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.model'; 

export type PaymentDocument = Document & Payments;

@Schema()
export class Payments {
  _id?: Types.ObjectId; 

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  alumnoId: User; 

  @Prop({ required: true })
  monto: number;

  @Prop({ required: true })
  razon: string;

  @Prop({ required: true })
  fecha_pago: Date;

  @Prop({ required: true })
  fecha_expiracion: Date;

  @Prop({ enum: ['Pendiente', 'Aprobado', 'Rechazado'], default: 'Pendiente' })
  estado: 'Pendiente' | 'Aprobado' | 'Rechazado';
}

export const PaymentSchema = SchemaFactory.createForClass(Payments);
