import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.model';

export type CourseBuyDocument = CourseBuy & Document;

@Schema()
export class CourseBuy {
  _id?: Types.ObjectId; 
  
  @Prop({ type: Types.ObjectId, ref: 'Subscription', default: null })
  subscriptionId?: Types.ObjectId | null;

  @Prop({ required: true })
  fecha_adquisicion: string;

  @Prop({ required: true })
  renovacion: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  estudianteId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;
}

export const CourseBuySchema = SchemaFactory.createForClass(CourseBuy);