import { Application } from "express";
import { BaseController, EndPointType } from "./base.controller";
import TransactionLocation from '../models/transaction-location.model';
import { getParamsId } from '../utils/get-params-id';
import { CreateTransactionLocationDTO } from "../dtos/transaction-location/create-transaction-location.dto";
import { FilterTransactionLocationDTO } from "../dtos/transaction-location/filter-transaction-location.dto";
import { TransactionLocationService } from "../services/transaction-location.service";


export class TransactionLocationController extends BaseController<TransactionLocation, TransactionLocationService> {
  constructor(app: Application) {
    super({
      app,
      service: new TransactionLocationService()
    })
  }

  protected basePath(): string {
    return "/transaction-location"
  }

  protected operatorEndPoints(): EndPointType[] {
    return [
      {
        path: "/",
        method: "post",
        handle: async (req, res) => {
          const data = new CreateTransactionLocationDTO(req.body)
          const transactionLocation = await this.service.create(data)
          res.status(201).send(transactionLocation)
        }
      },
      {
        path: '/',
        method: 'get',
        handle: async (req, res) => {
          const filters = new FilterTransactionLocationDTO(req.query)

          const transactionLocation = await this.service.listAll(filters)
          res.status(200).send(transactionLocation)
        }
      },
      {
        path: '/:id',
        method: 'get',
        handle: async (req, res) => {
          const id = getParamsId(req)
          const category = await this.service.listById(id)
          res.status(200).send(category)
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