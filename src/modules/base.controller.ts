import { Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { BaseService } from './base.service';
import { Document } from 'mongoose';
import { AuthGuard } from './jwt/auth.guard';

export class BaseController<T extends Document> {
  constructor(private readonly baseService: BaseService<T>) {}

  @Get("all")
  @UseGuards(AuthGuard)
  async findAll(): Promise<T[]> {
    return this.baseService.findAll();
  }

  @Get('getById/:id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<T> {
    return this.baseService.findOne(id);
  }

  @Post("create")
  @UseGuards(AuthGuard)
  async create(@Body() createDto: Partial<T>): Promise<T> {
    return this.baseService.create(createDto);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateDto: Partial<T>): Promise<T> {
    return this.baseService.update(id, updateDto);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string): Promise<T> {
    return this.baseService.remove(id);
  }
}
