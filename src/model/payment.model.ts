import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.model';

export type PaymentDocument = Document & Payments;

@Schema({ timestamps: true })
export class Payments {
  _id?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  alumnoId: User;

  @Prop({ required: true, min: 0 })
  monto: number;

  @Prop({ required: true, enum: ['PEN', 'MXN', 'USD'] })
  moneda: string;

  @Prop({ required: true })
  razon: string;

  @Prop({ required: true })
  fecha_pago: Date;

  @Prop({ required: true })
  fecha_expiracion: Date;

  @Prop({ required: true })
  codigo_transaccion: string;

  @Prop({ required: true })
  entity: string;

  @Prop({ 
    enum: ['Pendiente', 'Aprobado', 'Rechazado'], 
    default: 'Pendiente' 
  })
  estado: 'Pendiente' | 'Aprobado' | 'Rechazado';

  @Prop({ type: Object })
  metadata?: {
    imagen_voucher?: string;
    detalles_adicionales?: string;
    ip_transaccion?: string;
    dispositivo?: string;
  };

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payments);

// Índices para mejorar el rendimiento de las búsquedas
PaymentSchema.index({ codigo_transaccion: 1 }, { unique: true });
PaymentSchema.index({ alumnoId: 1, fecha_pago: -1 });
PaymentSchema.index({ estado: 1, fecha_pago: -1 });

// Middleware para validar el código de transacción según la moneda
PaymentSchema.pre('save', function(next) {
  const codigoTransaccionRegex = {
    PEN: /^[A-Z0-9]{6,20}$/,
    MXN: /^[A-Z0-9]{8,25}$/,
    USD: /^[A-Z0-9-]{8,30}$/
  };

  if (!codigoTransaccionRegex[this.moneda].test(this.codigo_transaccion)) {
    next(new Error(`Formato de código de transacción inválido para la moneda ${this.moneda}`));
  }
  next();
});

// Método para validar que la fecha de expiración sea posterior a la fecha de pago
PaymentSchema.methods.validateFechas = function() {
  return this.fecha_expiracion > this.fecha_pago;
};
