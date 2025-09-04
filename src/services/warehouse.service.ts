import { CreateWarehouseType } from "../dtos/warehouse/create-warehouse.dto";
import { WarehouseRepository } from "../repositories/warehouse.repository";

export class WarehouseService {
  private repository: WarehouseRepository
  constructor () {
    this.repository = new WarehouseRepository()
  }
  async Create(newWarehouse: CreateWarehouseType) {
    const res = await this.repository.Create(newWarehouse)
    return res
  }
}