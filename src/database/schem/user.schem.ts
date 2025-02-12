import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

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

Userschema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); 
  const salt = await bcrypt.genSalt(10);  
  this.password = await bcrypt.hash(this.password, salt); 
  next();  
});

Userschema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

