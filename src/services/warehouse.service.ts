import Warehouse from '../models/warehouse.model';
import { WarehouseRepository } from "../repositories/warehouse.repository";
import { BaseService } from './base.service';

export class WarehouseService extends BaseService<Warehouse>{
  constructor () {
    super(new WarehouseRepository())
  }
}