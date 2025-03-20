import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema({ timestamps: true })
export class Image {
  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  contentType: string;

  @Prop({ required: true })
  length: number;

  @Prop({ type: Object, default: { folder: 'default' } })
  metadata: {
    folder: string;
  };

  @Prop()
  createdAt?: Date;
}

export const ImageSchema = SchemaFactory.createForClass(Image); 