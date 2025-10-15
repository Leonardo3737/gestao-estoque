import { CreateLocationDTO } from '../dtos/location/create-location.dto';
import { FilterLocationDTO } from '../dtos/location/filter-location.dto';
import { ListLocationDTO, ListLocationsType, ListLocationType } from '../dtos/location/list-location.dto';
import { UpdateLocationDTO } from '../dtos/location/update-location.dto';
import { AppError } from '../errors/app.error';
import { LocationRepository } from "../repositories/location.repository";

export class LocationService {
  repository
  constructor() {
    this.repository = new LocationRepository()
  }

  async create(dto: CreateLocationDTO): Promise<ListLocationType> {
    const obj = dto.getAll()
    const newLocation = await this.repository.create(obj)
    return new ListLocationDTO(newLocation).getAll()
  }

  async alter(id: number, dto: UpdateLocationDTO): Promise<void> {
    const obj = dto.getAll()
    await this.listById(id)
    await this.repository.alter(id, obj)
  }

  async delete(id: number): Promise<void> {
    await this.listById(id)
    await this.repository.delete(id)
  }

  async listById(id: number): Promise<ListLocationType> {
    const obj = await this.repository.listById(id)

    if (!obj) {
      throw new AppError('Object not found', 404)
    }

    return new ListLocationDTO(obj).getAll()
  }

  async listAll(filter?: FilterLocationDTO): Promise<ListLocationsType> {
    const objs = await this.repository.listAll(filter?.getAll())
    return objs
  }
}