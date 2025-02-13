import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.model'; 

export type PaymentDocument = Payments & Document;

@Schema()
export class Payments {
  @Prop({ required: true })
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
