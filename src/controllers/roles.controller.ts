import { Application } from 'express';
import { CreateRolesDTO } from '../dtos/roles/create-roles.dto';
import { FilterRolesDTO } from '../dtos/roles/filter-roles.dto';
import { RolesService } from '../services/roles.service';
import { getParamsId } from '../utils/get-params-id';

export class RolesController {
  path = '/roles'
  constructor(
    private app: Application,
    private service: RolesService
  ) {
    app.get(this.path, async (req, res) => {
      const filters = new FilterRolesDTO({
        ...req.params
      })

      const roles = await service.listAllRoles(filters.getAll())
      res.status(200).send(roles)
    })

    app.post(this.path, async (req, res) => {
      const data = new CreateRolesDTO({
        ...req.body
      })

      const newRole = await service.registerRole(data)
      res.status(201).send(newRole)
    })

    app.patch(this.path, async (req, res) => {
      const data = new CreateRolesDTO({
        ...req.body
      })
      const userId = getParamsId(req)
      await service.alterRole(userId, data)
      res.status(204).send()
    })

    app.delete(this.path, async (req, res) => {
      const id = getParamsId(req)

      await service.deleteRole(id)
      res.status(204).send()
    })

  }
}