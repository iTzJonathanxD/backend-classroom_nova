import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { GridFSBucket, ObjectId } from 'mongodb';
import { Readable } from 'stream';
import { Image } from '../../model/image.model';

@Injectable()
export class ImageService {
  private bucket: GridFSBucket;

  constructor(@InjectConnection() private connection: Connection) {
    this.bucket = new GridFSBucket(this.connection.db, {
      bucketName: 'uploads',
    });
  }

  async uploadFile(file: Express.Multer.File, folder: string = 'default'): Promise<Image> {
    const uploadStream = this.bucket.openUploadStream(file.originalname, {
      metadata: { folder },
      contentType: file.mimetype,
    });

    const buffer = file.buffer;
    const stream = Readable.from(buffer);
    
    return new Promise((resolve, reject) => {
      stream.pipe(uploadStream)
        .on('error', (error) => reject(error))
        .on('finish', () => {
          resolve({
            _id: uploadStream.id,
            filename: file.originalname,
            contentType: file.mimetype,
            length: buffer.length,
            metadata: { folder },
          } as Image);
        });
    });
  }

  async getFile(id: string): Promise<{ stream: Readable; contentType: string }> {
    const file = await this.bucket.find({ _id: new ObjectId(id) }).next();
    if (!file) {
      throw new Error('File not found');
    }

    const stream = this.bucket.openDownloadStream(new ObjectId(id));
    return {
      stream,
      contentType: file.contentType,
    };
  }

  async listFiles(folder: string): Promise<Image[]> {
    const files = await this.bucket.find({ 'metadata.folder': folder }).toArray();
    return files.map(file => ({
      _id: file._id,
      filename: file.filename,
      contentType: file.contentType,
      length: file.length,
      metadata: file.metadata as { folder: string },
    } as Image));
  }

  async deleteFile(id: string): Promise<void> {
    await this.bucket.delete(new ObjectId(id));
  }
} 