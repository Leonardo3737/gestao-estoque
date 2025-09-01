import { CreateRolesType } from '../dtos/roles/create-roles.dto';
import { FilterRolesType } from '../dtos/roles/filter-roles.dto';
import { ListRolesDTO, ListRolesType } from '../dtos/roles/list-roles.dto';
import { RolesType } from '../dtos/roles/roles.schema';
import { AppError } from '../errors/app.error';
import { Roles } from '../models/roles.model';

export class RolesRepository {
  async alterRole(RoleId: number, newRolesData: CreateRolesType): Promise<void> {
    await Roles.update({ ...newRolesData as any }, { where: { id: RoleId } })
  }

  async createRole(newRoles: CreateRolesType): Promise<ListRolesType> {
    try {
      const process = await Roles.create(newRoles)

      const RolesCreated = new ListRolesDTO({ ...process.dataValues }).getAll()
      return RolesCreated
    }
    catch (err) {
      console.error('Erro ao criar role:', err);
      throw new AppError();
    }

  }

  async deleteRole(id: number): Promise<void> {
    await Roles.destroy({ where: { id } })
  }

  async listRoleById(id: number): Promise<RolesType | null> {
    const role = await Roles.findByPk(id)
    return role
  }


  async listRoles(filter?: Partial<FilterRolesType>): Promise<RolesType[] | null> {
    const roles = await Roles.findAll({
      where: {
        ...filter
      }
    })
    return roles
  }
}