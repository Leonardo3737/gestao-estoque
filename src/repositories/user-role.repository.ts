import { DatabaseError, ForeignKeyConstraintError, UniqueConstraintError, ValidationError, WhereOptions } from "sequelize";
import { CreateUserRoleType } from "../dtos/user-role/create-user-role.dto";
import { FilterUserRoleType } from "../dtos/user-role/filter-user-role.dto";
import { UpdateUserRoleType } from "../dtos/user-role/update-user-role.dto";
import UserRole from "../models/user-role.model";
import { cleanObject } from "../utils/cleanObject";
import { AppError } from "../errors/app.error";
import { ListUserRoleType, ListUserRoleDTO, ListUserRolesType } from "../dtos/user-role/list-user-role.dto";

export class UserRoleRepository {
  async listById(id: number): Promise<ListUserRoleType | null> {
    const userRole = await UserRole.findByPk(id)
    return userRole ? new ListUserRoleDTO(userRole).getAll() : null
  }

  async listAll(filters?: FilterUserRoleType): Promise<ListUserRolesType> {

    const page = filters?.page ?? 1
    const perPage = filters?.perPage ?? 10

    delete filters?.page
    delete filters?.perPage
    delete filters?.search

    const where: WhereOptions<UserRole> = {...cleanObject(filters || {})}

    // Conta total de registros
    const count = await UserRole.count({ where })

    const results = await UserRole.findAll({
      where,
      order: [['created_at', 'DESC']],
      offset: (page - 1) * perPage,
      limit: perPage
    })

    const data = results.map(item => new ListUserRoleDTO(item).getAll())

    const lastPage = Math.ceil(count / perPage)
    const hasMore = page < lastPage
    const from = count > 0 ? (page - 1) * perPage + 1 : 0
    const to = Math.min(page * perPage, count)

    return {
      data,
      meta: {
        page,
        count,
        perPage,
        hasMore,
        lastPage,
        from,
        to
      }
    }
  }

  async alter(id: number, newData: UpdateUserRoleType) {
    await UserRole.update(cleanObject(newData), { where: { id } })
  }

  async create(newData: CreateUserRoleType): Promise<UserRole> {
    try {
      const process = await UserRole.create(newData)
      return process
    }
    catch (err) {
      if (err instanceof ForeignKeyConstraintError) {
        throw new AppError("Invalid foreign key: related record does not exist.", 400);
      } else if (err instanceof UniqueConstraintError) {
        throw new AppError("Duplicate value: this value must be unique.", 400);
      } else if (err instanceof ValidationError) {
        const messages = err.errors.map(e => e.message).join(", ");
        throw new AppError(`Validation error: ${messages}`, 400);
      } else if (err instanceof DatabaseError) {
        console.error(err);
        throw new AppError("Internal database error.", 500);
      } else {
        console.error(err);
        throw new AppError("Unexpected error occurred.", 500);
      }
    }
  }

  async delete(id: number) {
    await UserRole.destroy({ where: { id } })
  }
}