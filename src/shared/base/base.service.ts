import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document, UpdateQuery } from 'mongoose';
import { BaseResponse } from 'src/common/interfaces/base-response.interface';

@Injectable()
export class BaseService<T> {
  constructor(@InjectModel('GenericModel') private readonly model: Model<T & Document<any, any, any>>) {}

  async findAll(): Promise<BaseResponse<T[]>> {
    const data = await this.model.find().lean().exec() as T[];
    return new BaseResponse<T[]>(true, 'Lista obtenida exitosamente', data);
  }

  async findOne(id: string): Promise<BaseResponse<T>> {
    const document = await this.model.findById(id).lean<T>().exec();
    if (!document) {
      throw new NotFoundException(`El documento con ID ${id} no fue encontrado.`);
    }
    return new BaseResponse(true, `Documento ${this.model.modelName} encontrado`, document);
  }

  async findOneWithPopulate(id: string, populateFields: string[]): Promise<BaseResponse<T>> {
    const document = await this.model.findById(id).populate(populateFields).lean<T>().exec();
    if (!document) {
      throw new NotFoundException(`El documento con ID ${id} no fue encontrado.`);
    }
    return new BaseResponse(true, `Documento ${this.model.modelName} encontrado con datos relacionados`, document);
  }

  async create(data: Partial<T>): Promise<BaseResponse<T>> {
    const document = new this.model(data);
    const savedDocument = await document.save();
    return new BaseResponse(true, `Documento ${this.model.modelName} creado exitosamente`, savedDocument.toObject() as T);
  }

  async update(id: string, data: UpdateQuery<T>): Promise<BaseResponse<T>> {
    const updatedDocument = await this.model
      .findByIdAndUpdate(id, data as UpdateQuery<T & Document>, { new: true })
      .lean()
      .exec();
  
    if (!updatedDocument) {
      throw new NotFoundException(`El documento con ID ${id} no fue encontrado.`);
    }
  
    return new BaseResponse<T>(true, `Documento ${this.model.modelName} actualizado exitosamente`, updatedDocument as T);
  }

  async remove(id: string): Promise<BaseResponse<T>> {
    const deletedDocument = await this.model.findByIdAndDelete(id).lean<T>().exec();
    if (!deletedDocument) {
      throw new NotFoundException(`El documento con ID ${id} no fue encontrado.`);
    }
    return new BaseResponse(true, `Documento ${this.model.modelName} eliminado exitosamente`, deletedDocument);
  }
}
