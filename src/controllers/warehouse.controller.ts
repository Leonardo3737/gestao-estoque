import { Application } from "express";
import { BaseController, EndPointType } from "./base.controller";
import { CreateWarehouseDTO } from "../dtos/warehouse/create-warehouse.dto";
import { WarehouseService } from "../services/warehouse.service";
import { getParamsId } from '../utils/get-params-id';
import { UpdateWarehouseDTO } from '../dtos/warehouse/update-warehouse.dto';
import { FilterWarehouseDTO } from '../dtos/warehouse/filter-warehouse.dto';

export class WarehouseController extends BaseController<WarehouseService> {
  constructor(app: Application) {
    super({
      app,
      service: new WarehouseService()
    })
  }

  protected basePath(): string {
    return "/warehouse"
  }

  protected operatorEndPoints(): EndPointType[] {
    return [
      {
        path: '/',
        method: 'get',
        handle: async (req, res) => {
          const filters = new FilterWarehouseDTO(req.query)

          const warehouses = await this.service.listAll(filters)
          res.status(200).send(warehouses)
        }
      },
      {
        path: '/:id',
        method: 'get',
        handle: async (req, res) => {
          const warehouseId = getParamsId(req)
          const warehouse = await this.service.listById(warehouseId)
          res.status(200).send(warehouse)
        }
      },
    ]
  }

  protected managerEndPoints(): EndPointType[] {
    return [
      {
        path: "/",
        method: "post",
        handle: async (req, res) => {
          const data = new CreateWarehouseDTO(req.body)
          const warehouse = await this.service.create(data)
          res.status(201).send(warehouse)
        }
      },
      {
        path: '/:id',
        method: 'patch',
        handle: async (req, res) => {
          const data = new UpdateWarehouseDTO(req.body)
          
          const warehouse = getParamsId(req)
          await this.service.alter(warehouse, data)
          res.status(204).send()
        }
      },
      {
        path: '/:id',
        method: 'delete',
        handle: async (req, res) => {
          const id = getParamsId(req)
          await this.service.delete(id)
          res.status(204).send()
        }
      },
    ]
  }

} 