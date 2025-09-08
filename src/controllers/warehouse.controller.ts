import { Application } from "express";
import { BaseController, EndPointType } from "./base.controller";
import { CreateWarehouseDTO } from "../dtos/warehouse/create-warehouse.dto";
import { WarehouseService } from "../services/warehouse.service";
import { AppError } from "../errors/app.error";
import Warehouse from '../models/warehouse.model';

export class WarehouseController extends BaseController<Warehouse, WarehouseService> {
  constructor(app: Application) {
    super({
      app,
      service: new WarehouseService()
    })
  }

  protected basePath(): string {
    return "/warehouse"
  }

  protected managerEndPoints(): EndPointType[] {
    return [{
      path: "/",
      method: "post",
      handle: async (req, res) => {
        const data = new CreateWarehouseDTO(req.body)
        const warehouse = await this.service.create(data)
        res.status(201).send(warehouse)
      }
    }]
  }

} 