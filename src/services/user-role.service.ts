import { CreateUserRoleDTO } from '../dtos/user-role/create-user-role.dto'
import { FilterUserRoleType } from '../dtos/user-role/filter-user-role.dto'
import { ListUserRoleType } from '../dtos/user-role/list-user-role.dto'
import { UserRoleType } from '../dtos/user-role/user-role.schema'
import { AppError } from "../errors/app.error"
import { UserRoleRepository } from '../repositories/user-role.repository'


export class UserRolesService {

  constructor(
    private repository: UserRoleRepository,
  ) { }

  async registerUserRole(newRoles: CreateUserRoleDTO): Promise<ListUserRoleType> {

    const user = newRoles.getAll()

    return await this.repository.createUserRole(user)
  }

  async alterUserRole(userId: number, newRoles: CreateUserRoleDTO): Promise<void> {

    const user = newRoles.getAll()

    await this.repository.alterUserRole(userId, user)
  }

  async deleteUserRole(id: number): Promise<void> {
    await this.listUserRoleById(id)
    await this.repository.deleteUserRole(id)
  }

  async listUserRoleById(id: number): Promise<ListUserRoleType> {
    const role = await this.repository.listUserRoleById(id)

    if (!role) {
      throw new AppError('Role not found', 404)
    }

    return role
  }

  async listAllUserRole(filter?: Partial<FilterUserRoleType>): Promise<ListUserRoleType[]> {
    const roles = await this.repository.listUserRole(filter)
    return roles as ListUserRoleType[]
  }
}