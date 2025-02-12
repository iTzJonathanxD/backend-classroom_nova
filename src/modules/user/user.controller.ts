import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../utils/index';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAll() {
    return await this.userService.findAll();
  }

  @Get('getById/:id')
  async get(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Post('create')
  async create(@Body() userData: Partial<User>) {
    return await this.userService.create(userData);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() userData: Partial<User>) {
    return await this.userService.update(id, userData);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
  
  @Post('login')
  async login(@Body() loginData: { email: string; password: string }) {
    const { email, password } = loginData;
    const user = await this.userService.findOneByUsername(email);
    if (!user || user.password !== password) {
      throw new Error('Credenciales incorrectas');
    }
    return {
      message: 'Login exitoso',
      user,
    };
  }
}
