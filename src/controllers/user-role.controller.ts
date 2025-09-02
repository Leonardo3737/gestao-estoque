import { Application, Router } from 'express';
import { CreateUserRoleDTO } from '../dtos/user-role/create-user-role.dto';
import { FilterUserRoleDTO } from '../dtos/user-role/filter-user-role.dto';
import { UserRolesService } from '../services/user-role.service';
import { getParamsId } from '../utils/get-params-id';
import { BaseController, EndPointType } from './base.controller';
import { RolesEnum } from '../enums/roles.enum';

export class UserRoleController extends BaseController {
  constructor(
    private app: Application,
    private service: UserRolesService
  ) {
    super({
      app
    })
  }

  protected basePath() {
    return '/user-role'
  }


  protected operatorEndPoints(): EndPointType[] {
    return [
      {
        path: '/',
        method: 'get',
        handle: async (req, res) => {
          const filters = new FilterUserRoleDTO({
            ...req.params
          })

          const userRoles = await this.service.listAllUserRole(filters.getAll())
          res.status(200).send(userRoles)
        }
      },
      {
        path: '/:id',
        method: 'patch',
        handle: async (req, res) => {
          const data = new CreateUserRoleDTO({
            ...req.body
          })
          const userRoleId = getParamsId(req)
          await this.service.alterUserRole(userRoleId, data)
          res.status(204).send()
        }
      },
      {
        path: '/:id',
        method: 'delete',
        handle: async (req, res) => {
          const id = getParamsId(req)
          await this.service.deleteUserRole(id)
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
          const data = new CreateUserRoleDTO({
            ...req.body
          })

          const newRole = await this.service.registerUserRole(data)
          res.status(201).send(newRole)
        }
      },
    ]
  }

}