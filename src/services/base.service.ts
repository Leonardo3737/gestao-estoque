import { AppError } from "../errors/app.error"
import { BaseRepository } from '../repositories/base.repository'
import { DTO } from '../dtos/dto'
import z from 'zod'
import { Attributes, InferAttributes, Model, WhereOptions } from "sequelize"


export abstract class BaseService<TModel extends Model> {

  constructor(
    protected repository: BaseRepository<TModel>,
  ) { }

  async create<Schema extends z.ZodType>(dto: DTO<Schema>): Promise<object> {
    const obj = dto.getAll()
    return await this.repository.create(obj)
  }

  async alter<Schema extends z.ZodType>(id: number, dto: DTO<Schema>): Promise<void> {
    const obj = dto.getAll()
    await this.repository.alter(id, obj as Partial<InferAttributes<TModel>>)
  }

  async delete(id: number): Promise<void> {
    await this.listById(id)
    await this.repository.delete(id)
  }

  async listById(id: number): Promise<object> {
    const obj = await this.repository.listById(id)

    if (!obj) {
      throw new AppError('Object not found', 404)
    }

    return obj
  }

  async listAll<Schema extends z.ZodType>(filter?: DTO<Schema>): Promise<object[]> {
    const objs = await this.repository.listAll(filter?.getAll() as WhereOptions<Attributes<TModel>>)
    return objs as object[]
  }
}