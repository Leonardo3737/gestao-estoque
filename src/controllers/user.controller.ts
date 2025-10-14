import { Application, Request, Response, Router } from "express";
import { UserService } from "../services/user.service";
import { CreateUserDTO } from "../dtos/user/create-user.dto";
import { UserAuthDTO } from "../dtos/user/user-auth.dto";
import { AppError } from "../errors/app.error";
import { getParamsId } from "../utils/get-params-id";
import { UpdateUserDTO } from "../dtos/user/update-user.dto";
import { FilterUserDTO } from "../dtos/user/filter-user.dto";
import { BaseController, EndPointType } from "./base.controller";
import User from "../models/user.model";

export class UserController extends BaseController<User, UserService> {

  constructor(
    app: Application
  ) {
    super({
      app,
      service: new UserService()
    })
  }

  protected basePath() {
    return '/user'
  }

  publicEndPoints(): EndPointType[] {
    return [
      {
        path: '/',
        method: 'post',
        handle: async (req: Request, res: Response) => {
          const data = new CreateUserDTO(req.body)

          const newUser = await this.service.create(data)
          res.status(201).send(newUser)
        }
      },
      {
        path: '/auth',
        method: 'post',
        handle: async (req: Request, res: Response) => {
          const data = new UserAuthDTO(req.body)

          const token = await this.service.userAuth(data)
          res.status(200).send({ token })
        }
      },
    ]
  }

  protected defaultEndPoints(): EndPointType[] {
    return [
      {
        path: '/:id',
        method: 'get',
        handle: async (req: Request, res: Response) => {
          const id = getParamsId(req)
          const user = await this.service.listById(id)
          res.send(user)
        }
      },
      {
        path: '/:id',
        method: 'patch',
        handle: async (req: Request, res: Response) => {
          const data = new UpdateUserDTO(req.body)
          const userId = getParamsId(req)
          const newUser = await this.service.alter(userId, data)
          res.status(204).send(newUser)
        }
      },
    ]
  }

  protected adminEndPoints(): EndPointType[] {
    return [
      {
        path: '/:id',
        method: 'delete',
        handle: async (req: Request, res: Response) => {
          const id = getParamsId(req)

          await this.service.delete(id)
          res.status(204).send()
        }
      },
      {
        path: '/',
        method: 'get',
        handle: async (req: Request, res: Response) => {
          const filters = new FilterUserDTO(req.query)
          const user = await this.service.listAll(filters)
          res.send(user)
        }
      },
    ]
  }
}