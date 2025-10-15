import { Application } from "express";
import { BaseController, EndPointType } from "./base.controller";
import { getParamsId } from '../utils/get-params-id';
import { RequestService } from "../services/request.service";
import { FilterRequestDTO } from "../dtos/request/filter-request.schema copy 2";


export class RequestController extends BaseController<RequestService> {
  constructor(app: Application) {
    super({
      app,
      service: new RequestService()
    })
  }

  protected basePath(): string {
    return "/request"
  }

  protected adminEndPoints(): EndPointType[] {
    return [
      {
        path: '/',
        method: 'get',
        handle: async (req, res) => {
          const filters = new FilterRequestDTO(req.query)
          const requests = await this.service.listAll(filters)
          res.status(200).send(requests)
        }
      },
      {
        path: '/:id',
        method: 'get',
        handle: async (req, res) => {
          const requestId = getParamsId(req)
          const request = await this.service.listById(requestId)
          res.status(200).send(request)
        }
      },
    ]
  }
} 