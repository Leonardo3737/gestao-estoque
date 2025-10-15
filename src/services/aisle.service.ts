import { CreateAisleDTO } from '../dtos/aisle/create-aisle.dto';
import { FilterAisleDTO } from '../dtos/aisle/filter-aisle.dto';
import { ListAisleDTO, ListAislesType, ListAisleType } from '../dtos/aisle/list-aisle.dto';
import { UpdateAisleDTO } from '../dtos/aisle/update-aisle.dto';
import { AppError } from '../errors/app.error';
import { AisleRepository } from "../repositories/aisle.repository";

export class AisleService {
  repository
  constructor() {
    this.repository = new AisleRepository()
  }

  async create(dto: CreateAisleDTO): Promise<ListAisleType> {
    const obj = dto.getAll()
    const newAisle = await this.repository.create(obj)
    return new ListAisleDTO(newAisle).getAll()
  }

  async alter(id: number, dto: UpdateAisleDTO): Promise<void> {
    const obj = dto.getAll()
    await this.listById(id)
    await this.repository.alter(id, obj)
  }

  async delete(id: number): Promise<void> {
    await this.listById(id)
    await this.repository.delete(id)
  }

  async listById(id: number): Promise<ListAisleType> {
    const obj = await this.repository.listById(id)

    if (!obj) {
      throw new AppError('Object not found', 404)
    }

    return new ListAisleDTO(obj).getAll()
  }

  async listAll(filter?: FilterAisleDTO): Promise<ListAislesType> {
    const objs = await this.repository.listAll(filter?.getAll())
    return objs
  }
}