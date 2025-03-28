import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  telefono: string;

  @Prop({ required: true, unique: true })
  novaId: string;

  @Prop({ required: true })
  countryCode: string;

  @Prop()
  foto_perfil?: string;

  @Prop({ type: [String], default: [] })
  enrolledCoursesIds: string[];

  @Prop({ required: true })
  rol: string;

  @Prop()
  createdAt?: Date; 
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next(); 

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); 
  next();
});
