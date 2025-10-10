import { Application } from "express";
import { BaseController, EndPointType } from "./base.controller";
import { AisleService } from '../services/aisle.service';
import Aisle from '../models/aisle.model';
import { CreateAisleDTO } from '../dtos/aisle/create-aisle.dto';
import { FilterAisleDTO } from '../dtos/aisle/filter-aisle.dto';
import { UpdateAisleDTO } from '../dtos/aisle/update-aisle.dto';
import { getParamsId } from '../utils/get-params-id';


export class AisleController extends BaseController<Aisle, AisleService> {
  constructor(app: Application) {
    super({
      app,
      service: new AisleService()
    })
  }

  protected basePath(): string {
    return "/aisle"
  }

  protected operatorEndPoints(): EndPointType[] {
    return [
      {
        path: '/',
        method: 'get',
        handle: async (req, res) => {
          const filters = new FilterAisleDTO(req.query)

          const aisle = await this.service.listAll(filters)
          res.status(200).send(aisle)
        }
      },
      {
        path: '/:id',
        method: 'get',
        handle: async (req, res) => {
          const aisleId = getParamsId(req)
          const aisle = await this.service.listById(aisleId)
          res.status(200).send(aisle)
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
          const data = new CreateAisleDTO(req.body)
          const aisle = await this.service.create(data)
          res.status(201).send(aisle)
        }
      },
      {
        path: '/:id',
        method: 'patch',
        handle: async (req, res) => {
          const data = new UpdateAisleDTO(req.body)
          const aisle = getParamsId(req)
          await this.service.alter(aisle, data)
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