import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Document } from 'mongoose';

@Injectable()
export class BaseService<T extends Document> {
  constructor(private readonly model: Model<T>) {}

  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<T> {
    const document = await this.model.findById(id).exec();
    if (!document) {
      throw new NotFoundException(`Documento con ID ${id} no encontrado`);
    }
    return document;
  }

  async findOneWithPopulate(id: string, populateFields: string[]): Promise<T> {
    const document = await this.model.findById(id).populate(populateFields).exec();
    if (!document) {
      throw new NotFoundException(`Documento con ID ${id} no encontrado`);
    }
    return document;
  }

  async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);
    return document.save();
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const updatedDocument = await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updatedDocument) {
      throw new NotFoundException(`Documento con ID ${id} no encontrado`);
    }
    return updatedDocument;
  }

  async remove(id: string): Promise<T> {
    const deletedDocument = await this.model.findByIdAndDelete(id).exec();
    if (!deletedDocument) {
      throw new NotFoundException(`Documento con ID ${id} no encontrado`);
    }
    return deletedDocument;
  }
}
