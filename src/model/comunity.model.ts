import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Live } from './live.model'; 
import { User } from './user.model';

export type CommunityDocument = Community & Document;

@Schema()
export class Community {
  _id?: Types.ObjectId; 

  @Prop({ type: String, ref: 'Live', required: true })
  videoId: Live;

  @Prop({ type: String, ref: 'User', required: true })
  alumnoId: User;

  @Prop({ required: true })
  comentario: string;

  @Prop({ required: true })
  fecha_creacion: Date;
}

export const CommunitySchema = SchemaFactory.createForClass(Community);
