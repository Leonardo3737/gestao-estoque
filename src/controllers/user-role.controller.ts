import { Application } from 'express';
import { CreateUserRoleDTO } from '../dtos/user-role/create-user-role.dto';
import { FilterUserRoleDTO } from '../dtos/user-role/filter-user-role.dto';
import { UserRoleService } from '../services/user-role.service';
import { getParamsId } from '../utils/get-params-id';
import { BaseController, EndPointType } from './base.controller';
import { UpdateUserRoleDTO } from '../dtos/user-role/update-user-role.dto';

export class UserRoleController extends BaseController<UserRoleService> {
  constructor(
    app: Application
  ) {
    super({
      app,
      service: new UserRoleService()
    })
  }

  protected basePath() {
    return '/user-role'
  }

  protected adminEndPoints(): EndPointType[] {
    return [
      {
        path: '',
        method: 'post',
        handle: async (req, res) => {
          const data = new CreateUserRoleDTO(req.body)

          const newRole = await this.service.create(data)

          res.locals.responseData = newRole
          res.status(201).send(newRole)
        }
      },
      {
        path: '/',
        method: 'get',
        handle: async (req, res) => {
          const filters = new FilterUserRoleDTO(req.query)

          const userRoles = await this.service.listAll(filters)
          res.status(200).send(userRoles)
        }
      },
      {
        path: '/:id',
        method: 'patch',
        handle: async (req, res) => {
          const data = new UpdateUserRoleDTO(req.body)
          const userRoleId = getParamsId(req)
          await this.service.alter(userRoleId, data)
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