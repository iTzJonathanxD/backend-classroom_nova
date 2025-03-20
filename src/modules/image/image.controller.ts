import { Controller, Get, Post, Delete, Param, UseInterceptors, UploadedFile, Query, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ImageService } from './image.service';
import { Image } from '../../model/image.model';

@Controller('api/v1/images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
  ): Promise<Image> {
    return this.imageService.uploadFile(file, folder);
  }

  @Get('folder/:folderName')
  async listFiles(@Param('folderName') folderName: string): Promise<Image[]> {
    return this.imageService.listFiles(folderName);
  }

  @Get(':id')
  async getFile(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const { stream, contentType } = await this.imageService.getFile(id);
    res.setHeader('Content-Type', contentType);
    stream.pipe(res);
  }

  @Delete(':id')
  async deleteFile(@Param('id') id: string): Promise<void> {
    await this.imageService.deleteFile(id);
  }
} 