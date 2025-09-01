import { CreateRolesDTO } from '../dtos/roles/create-roles.dto'
import { FilterRolesType } from '../dtos/roles/filter-roles.dto'
import { ListRolesType } from '../dtos/roles/list-roles.dto'
import { RolesType } from '../dtos/roles/roles.schema'
import { AppError } from "../errors/app.error"
import { RolesRepository } from '../repositories/roles.repository'


export class RolesService {

  constructor(
    private repository: RolesRepository,
  ) { }

  async registerRole(newRoles: CreateRolesDTO): Promise<ListRolesType> {

    const user = newRoles.getAll()

    return await this.repository.createRole(user)
  }

  async alterRole(userId: number, newRoles: CreateRolesDTO): Promise<void> {

    const user = newRoles.getAll()

    await this.repository.alterRole(userId, user)
  }

  async deleteRole(id: number): Promise<void> {
    await this.listRolesById(id)
    await this.repository.deleteRole(id)
  }

  async listRolesById(id: number): Promise<ListRolesType> {
    const role = await this.repository.listRoleById(id)

    if (!role) {
      throw new AppError('Role not found', 404)
    }

    return role
  }

  async listAllRoles(filter?: Partial<FilterRolesType>): Promise<ListRolesType[]> {
    const roles = await this.repository.listRoles(filter)
    return roles as ListRolesType[]
  }
}