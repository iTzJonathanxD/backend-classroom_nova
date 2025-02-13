import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LiveDocument = Live & Document;

@Schema()
export class Live {
  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true })
  url_video: string;
}

export const LiveSchema = SchemaFactory.createForClass(Live);
