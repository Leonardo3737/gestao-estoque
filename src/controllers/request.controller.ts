import { Application } from "express";
import { BaseController, EndPointType } from "./base.controller";
import Request from '../models/request.model';
import { getParamsId } from '../utils/get-params-id';
import { RequestService } from "../services/request.service";


export class RequestController extends BaseController<Request, RequestService> {
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
          const requests = await this.service.listAll()
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