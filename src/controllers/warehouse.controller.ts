/* import { Application } from "express";
import { BaseController, EndPointType } from "./base.controller";
import { CreateWarehouseDTO } from "../dtos/warehouse/create-warehouse.dto";
import { WarehouseService } from "../services/warehouse.service";
import { AppError } from "../errors/app.error";

export class WarehouseController extends BaseController {
  private service: WarehouseService
  constructor(private app: Application) {
    super(app)
    this.service = new WarehouseService()
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
        const warehouse = await this.service.Create(data.getAll())
        res.status(201).send(warehouse)
      }
    }]
  }

} */