import { Application } from "express";
import { BaseController, EndPointType } from "./base.controller";
import Transaction from '../models/transaction.model';
import { getParamsId } from '../utils/get-params-id';
import { CreateTransactionDTO } from "../dtos/transaction/create-transaction.dto";
import { FilterTransactionDTO } from "../dtos/transaction/filter-transaction.dto";
import { TransactionService } from "../services/transaction.service";
import { UpdateTransactionDTO } from "../dtos/transaction/update-transaction.dto";


export class TransactionController extends BaseController<Transaction, TransactionService> {
  constructor(app: Application) {
    super({
      app,
      service: new TransactionService()
    })
  }

  protected basePath(): string {
    return "/transaction"
  }

  protected operatorEndPoints(): EndPointType[] {
    return [
      {
        path: "/",
        method: "post",
        handle: async (req, res) => {
          const data = new CreateTransactionDTO({ ...req.body, userId: req.user?.sub })
          const transaction = await this.service.create(data)
          //res.locals.responseData = transaction
          res.status(201).send(transaction)
        }
      },
      {
        path: '/',
        method: 'get',
        handle: async (req, res) => {
          const filters = new FilterTransactionDTO(req.query)

          const transaction = await this.service.listAll(filters)
          res.status(200).send(transaction)
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
        method: 'patch',
        handle: async (req, res) => {
          const data = new UpdateTransactionDTO(req.body)
          const transaction = getParamsId(req)
          await this.service.alter(transaction, data)
          res.status(204).send()
        }
      },
    ]
  }

  protected adminEndPoints(): EndPointType[] {
    return [
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