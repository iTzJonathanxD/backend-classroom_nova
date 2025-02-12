import * as bcrypt from 'bcryptjs';

export class User {
    id: string;
    nombre: string;
    email: string;
    password: string;
    telefono: string;
    foto_perfil?: string;
    rol: string;

    async comparePassword(candidatePassword: string): Promise<boolean> {
      return bcrypt.compare(candidatePassword, this.password);
  }
}