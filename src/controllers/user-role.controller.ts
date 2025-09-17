import { Application, Router } from 'express';
import { CreateUserRoleDTO } from '../dtos/user-role/create-user-role.dto';
import { FilterUserRoleDTO } from '../dtos/user-role/filter-user-role.dto';
import { UserRolesService } from '../services/user-role.service';
import { getParamsId } from '../utils/get-params-id';
import { BaseController, EndPointType } from './base.controller';
import { UpdateUserRoleDTO } from '../dtos/user-role/update-user-role.dto';
import UserRole from '../models/user-role.model';

export class UserRoleController extends BaseController<UserRole, UserRolesService> {
  constructor(
    app: Application
  ) {
    super({
      app,
      service: new UserRolesService()
    })
  }

  protected basePath() {
    return '/user-role'
  }

  protected adminEndPoints(): EndPointType[] {
    return [
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

  protected publicEndPoints(): EndPointType[] {
    return [
      {
        path: '',
        method: 'post',
        handle: async (req, res) => {
          const data = new CreateUserRoleDTO(req.body)

          const newRole = await this.service.create(data)
          res.status(201).send(newRole)
        }
      },
    ]
  }

}