import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';
import { envs } from '../../config/env.config';  

const secretKey = envs.jwt;  

export function verifyJwt(token: string): any {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;  
  } catch (error) {
    throw new UnauthorizedException('Token no válido');
  }
}

export function generateJwt(user: any): string {
  return jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });  
}
