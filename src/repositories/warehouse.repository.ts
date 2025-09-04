import { CreateWarehouseType } from "../dtos/warehouse/create-warehouse.dto";
import { ListWarehouseDTO, ListWarehouseType } from "../dtos/warehouse/list-warehouse.dto";
import { AppError } from "../errors/app.error";
import Warehouse from "../models/warehouse.model";

export class WarehouseRepository {
  async Create(newWarehouse: CreateWarehouseType): Promise<ListWarehouseType>{
    try {
      const process = await Warehouse.create(newWarehouse)

      const warehouseCreated = new ListWarehouseDTO({ ...process.dataValues }).getAll()
      return warehouseCreated
    }
    catch (err) {
      console.error('Erro ao criar armazém:', err);
      throw new AppError();
    }
  }
}