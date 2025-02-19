import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Course } from './courses.model'; 

export type CategoryCourseDocument = CategoryCourse & Document;

@Schema()
export class CategoryCourse {
  _id?: Types.ObjectId; 
  
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  imagen_referencia: string;

  @Prop({ type: [{ type: String, ref: 'Course' }] })
  cursosId: Course[];
}

export const CategoryCourseSchema = SchemaFactory.createForClass(CategoryCourse);
