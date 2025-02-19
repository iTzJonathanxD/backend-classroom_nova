import { Get, Post, Put, Delete, Param, Body, UseGuards, Controller } from '@nestjs/common';
import { BaseService } from './base.service';
import { Document } from 'mongoose';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { BaseResponse } from 'src/common/interfaces/base-response.interface';
import { Types } from 'mongoose';
import { Auth } from 'src/common/decorators/auth.decorator';

@Controller()
export class BaseController<T extends Document> {
  constructor(private readonly baseService: BaseService<T>) {}

  @Get("all")
  @Auth()
  @UseGuards(AuthGuard)
  async findAll(): Promise<BaseResponse<T[]>> {
    return this.baseService.findAll();
  }

  @Get('getById/:id')
  @Auth()
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string): Promise<BaseResponse<T>> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('ID no es válido');
    }
    return this.baseService.findOne(id);
  }

  @Post("create")
  @Auth()
  @UseGuards(AuthGuard)
  async create(@Body() createDto: Partial<T>): Promise<BaseResponse<T>> {
    return this.baseService.create(createDto);
  }

  @Put('update/:id')
  @Auth()
  @UseGuards(AuthGuard)
  async update(@Param('id') id: string, @Body() updateDto: Partial<T>): Promise<BaseResponse<T>> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('ID no es válido');
    }
    return this.baseService.update(id, updateDto);
  }

  @Delete('delete/:id')
  @Auth()
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string): Promise<BaseResponse<T>> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('ID no es válido');
    }
    return this.baseService.remove(id);
  }
}
