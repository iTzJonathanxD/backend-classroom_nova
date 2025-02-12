import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'; 
import { envs } from '../../config'

@Injectable()
export class JwtServices {
  private readonly secretKey = envs.jwt

  async verifyJwt(token: string) {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded; 
    } catch (error) {
      throw new Error('Token no válido');
    }
  }

  async generateJwt(user: any) {
    return jwt.sign({ userId: user.id }, this.secretKey, { expiresIn: '1h' });
  }
}
