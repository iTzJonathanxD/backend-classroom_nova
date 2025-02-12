import * as mongoose from 'mongoose';

export const Userschema = new mongoose.Schema(
  {
    nombre: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    telefono: { 
      type: String, 
      required: true 
    },
    foto_perfil: { 
      type: String, 
      required: false 
    },
    rol: {
      type: String,
      required: true
    }
  },
  { timestamps: true },
);

Userschema.index({ nombre: 1 }, { unique: true });
Userschema.index({ email: 1 }, { unique: true });