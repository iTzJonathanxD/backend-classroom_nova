import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Live } from './live.model'; 
import { User } from './user.model';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  descripion: string;

  @Prop({ type: [{ type: String, ref: 'User' }] })
  docenteId: User[];

  @Prop({ type: [{ type: String, ref: 'Live' }] })
  videos: Live[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
