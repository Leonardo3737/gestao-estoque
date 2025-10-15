import { CreateWarehouseDTO } from '../dtos/warehouse/create-warehouse.dto';
import { FilterWarehouseDTO } from '../dtos/warehouse/filter-warehouse.dto';
import { ListWarehouseDTO, ListWarehousesType, ListWarehouseType } from '../dtos/warehouse/list-warehouse.dto';
import { UpdateWarehouseDTO } from '../dtos/warehouse/update-warehouse.dto';
import { AppError } from '../errors/app.error';
import { WarehouseRepository } from "../repositories/warehouse.repository";

export class WarehouseService {
  repository
  constructor() {
    this.repository = new WarehouseRepository()
  }

  async create(dto: CreateWarehouseDTO): Promise<ListWarehouseType> {
    const obj = dto.getAll()
    const newWarehouse = await this.repository.create(obj)
    return new ListWarehouseDTO(newWarehouse).getAll()
  }

  async alter(id: number, dto: UpdateWarehouseDTO): Promise<void> {
    const obj = dto.getAll()
    await this.listById(id)
    await this.repository.alter(id, obj)
  }

  async delete(id: number): Promise<void> {
    await this.listById(id)
    await this.repository.delete(id)
  }

  async listById(id: number): Promise<ListWarehouseType> {
    const obj = await this.repository.listById(id)

    if (!obj) {
      throw new AppError('Object not found', 404)
    }

    return new ListWarehouseDTO(obj).getAll()
  }

  async listAll(filter?: FilterWarehouseDTO): Promise<ListWarehousesType> {
    const objs = await this.repository.listAll(filter?.getAll())
    return objs
  }
}