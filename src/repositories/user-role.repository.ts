import { CreateUserRoleType } from '../dtos/user-role/create-user-role.dto';
import { FilterUserRoleType } from '../dtos/user-role/filter-user-role.dto';
import { ListUserRoleDTO, ListUserRoleType } from '../dtos/user-role/list-user-role.dto';
import { UserRoleType } from '../dtos/user-role/user-role.schema';
import { AppError } from '../errors/app.error';
import UserRole from '../models/user-role.model';

export class UserRoleRepository {
  async alterUserRole(RoleId: number, newRolesData: CreateUserRoleType): Promise<void> {
    await UserRole.update({ ...newRolesData as any }, { where: { id: RoleId } })
  }

  async createUserRole(newRoles: CreateUserRoleType): Promise<ListUserRoleType> {
    try {
      const process = await UserRole.create(newRoles)

      const UserRolesCreated = new ListUserRoleDTO({ ...process.dataValues }).getAll()
      return UserRolesCreated
    }
    catch (err) {
      console.error('Erro ao criar role:', err);
      throw new AppError();
    }

  }

  async deleteUserRole(id: number): Promise<void> {
    await UserRole.destroy({ where: { id } })
  }

  async listUserRoleById(id: number): Promise<UserRoleType | null> {
    const userRoles = await UserRole.findByPk(id)
    return userRoles
  }


  async listUserRole(filter?: Partial<FilterUserRoleType>): Promise<UserRoleType[] | null> {
    const roles = await UserRole.findAll({
      where: {
        ...filter
      }
    })
    return roles
  }
}