import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Live } from './live.model'; 
import { User } from './user.model';
import { CategoryCourse } from './categorycourse.model';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  descripion: string;

  @Prop({ required: false })
  imageUrl: string;

  @Prop({ required: true, enum: ['Principiante', 'Intermedio', 'Avanzado'] })
  difficulty: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true, min: 0, max: 5, default: 0 })
  rating: number;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ type: String, ref: 'CategoryCourse', required: true })
  categoryId: CategoryCourse;

  @Prop({ type: [{ type: String, ref: 'User' }] })
  docenteId: User[];

  @Prop({ type: [{ type: String, ref: 'Live' }] })
  videos: Live[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
