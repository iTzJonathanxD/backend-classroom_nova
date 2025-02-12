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
}
