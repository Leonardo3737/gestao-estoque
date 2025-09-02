import { Application, Request, Response, Router } from "express";
import { UserService } from "../services/user.service";
import { CreateUserDTO } from "../dtos/user/create-user.dto";
import { UserAuthDTO } from "../dtos/user/user-auth.dto";
import { AppError } from "../errors/app.error";
import { getParamsId } from "../utils/get-params-id";
import { UpdateUserDTO } from "../dtos/user/update-user.dto";
import { FilterUserDTO } from "../dtos/user/filter-user.dto";
import { BaseController, EndPointType } from "./base.controller";

export class UserController extends BaseController {

  constructor(
    private app: Application,
    private service: UserService
  ) {
    super(app)
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
          const data = new CreateUserDTO({
            ...req.body
          })

          const newUser = await this.service.registerUser(data)
          res.status(201).send(newUser)
        }
      },
      {
        path: '/auth',
        method: 'post',
        handle: async (req: Request, res: Response) => {
          const data = new UserAuthDTO({
            ...req.body
          })

          const token = await this.service.userAuth(data)
          res.status(200).send({ token })
        }
      },
    ]
  }

  protected defaultEndPoints(): EndPointType[] {
    return [
      {
        path: '/infos',
        method: 'get',
        handle: async (req: Request, res: Response) => {
          if (!req.user) {
            throw new AppError('unauthorized', 401)
          }
          const user = await this.service.listUserById(req.user.sub)
          res.send(user)
        }
      },
      {
        path: '/:id',
        method: 'patch',
        handle: async (req: Request, res: Response) => {
          const data = new UpdateUserDTO({
            ...req.body
          })
          const userId = getParamsId(req)
          const newUser = await this.service.alterUser(userId, data)
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

          await this.service.deleteUser(id)
          res.status(204).send()
        }
      },
      {
        path: '/',
        method: 'get',
        handle: async (req: Request, res: Response) => {
          const filters = new FilterUserDTO(req.params)
          const user = await this.service.listAllUsers(filters.getAll())
          res.send(user)
        }
      },
      {
        path: '/:id',
        method: 'get',
        handle: async (req: Request, res: Response) => {
          const id = getParamsId(req)
          const user = await this.service.listUserById(id)
          res.send(user)
        }
      },
    ]
  }
}