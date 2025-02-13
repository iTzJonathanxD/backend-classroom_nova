import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.model';

export type CourseBuyDocument = CourseBuy & Document;

@Schema()
export class CourseBuy {
  @Prop({ required: true })
  fecha_adquisicion: string;

  @Prop({ required: true })
  renovacion: string;

  @Prop({ type: [{ type: String, ref: 'User' }] })
  referidosId: User[];
}

export const CourseBuySchema = SchemaFactory.createForClass(CourseBuy);
