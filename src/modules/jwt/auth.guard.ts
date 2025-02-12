import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtServices } from '../jwt/jwt.service'; 

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtServices) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const token = authHeader.split(' ')[1];

    try {
      const user = await this.jwtService.verifyJwt(token); 
      request.user = user; 
      return true;
    } catch (error) {
      throw new UnauthorizedException('El Token ingresado no es válido o se encuentra expirado');
    }
  }
}
