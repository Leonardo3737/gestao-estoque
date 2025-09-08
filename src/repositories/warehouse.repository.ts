import Warehouse from "../models/warehouse.model";
import { BaseRepository } from './base.repository';

export class WarehouseRepository extends BaseRepository<Warehouse>{
  constructor() {
    super(Warehouse)
  }
}