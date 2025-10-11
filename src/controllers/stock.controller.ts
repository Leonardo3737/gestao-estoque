import { Application } from "express";
import { FilterStockDTO } from "../dtos/stock/filter-stock.dto";
import Stock from '../models/stock.model';
import { StockService } from "../services/stock.service";
import { getParamsId } from '../utils/get-params-id';
import { BaseController, EndPointType } from "./base.controller";

export class StockController extends BaseController<Stock, StockService> {
  constructor(app: Application) {
    super({
      app,
      service: new StockService()
    })
  }

  protected basePath(): string {
    return "/stock"
  }

  protected operatorEndPoints(): EndPointType[] {
    return [
      {
        path: '/',
        method: 'get',
        handle: async (req, res) => {
          const filters = new FilterStockDTO(req.query)

          const stock = await this.service.listAll(filters)
          res.status(200).send(stock)
        }
      },
      {
        path: '/:id',
        method: 'get',
        handle: async (req, res) => {
          const id = getParamsId(req)
          const stock = await this.service.listById(id)
          res.status(200).send(stock)
        }
      },
    ]
  }

} 