import { Controller, Get, Post, Body, Param, Put, Delete, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/model';
import { JwtServices } from '../jwt/jwt.service';
import { AuthGuard } from '../jwt/auth.guard';

@Controller('api/v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService, 
    private readonly tokenService: JwtServices
  ) {}

  @Get('all')
  @UseGuards(AuthGuard) 
  async getAll() {
    return await this.userService.findAll();
  }

  @Get('getById/:id')
  @UseGuards(AuthGuard) 
  async get(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Get('getByNovaId/:novaId')
  @UseGuards(AuthGuard) 
  async getByNovaId(@Param('novaId') novaId: string) {
    return await this.userService.findOneByNovaId(novaId);
  }

  @Post('create')
  async create(@Body() userData: Partial<User>) {
    const user = await this.userService.create(userData);
    const token = await this.tokenService.generateJwt(user);

    return {
      message: 'Usuario creado exitosamente',
      user,
      token,
    };
  }

  @Put('update/:id')
  @UseGuards(AuthGuard) 
  async update(@Param('id') id: string, @Body() userData: Partial<User>) {
    return await this.userService.update(id, userData);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard) 
  async delete(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
  
  @Post('login')
  async login(@Body() loginData: { email: string; password: string }) {
    const { email, password } = loginData;
    const user = await this.userService.findOneByUsername(email);
  
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
  
    const isMatch = await (user as any).comparePassword(password);
    if (!isMatch) {
      throw new Error('Credenciales incorrectas');
    }
  
    const token = await this.tokenService.generateJwt(user);
  
    return {
      message: 'Login exitoso',
      user,
      token,
    };
  }
  

  @Patch('change-password/:id')
  @UseGuards(AuthGuard) 
  async changePassword(
    @Param('id') id: string,
    @Body('newPassword') newPassword: string
  ) {
    return await this.userService.changePassword(id, newPassword);
  }
}
