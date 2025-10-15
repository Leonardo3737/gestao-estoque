import { DatabaseError, ForeignKeyConstraintError, Op, UniqueConstraintError, ValidationError, WhereOptions } from "sequelize";
import { UserType } from "../dtos/user/user.schema";
import User from "../models/user.model";
import { AppError } from "../errors/app.error";
import { CreateUserType } from "../dtos/user/create-user.dto";
import { cleanObject } from "../utils/cleanObject";
import { UpdateUserType } from "../dtos/user/update-user.dto";
import { FilterUserType } from "../dtos/user/filter-user.dto";
import { ListUserByAdminDTO, ListUsersByAdminType, ListUserType } from "../dtos/user/list-user.dto";

export class UserRepository {

  // DEVE SER CHAMDA APENAS EM UserService.resetPassword
  async resetPassword(id: number, password: string): Promise<void> {
    await User.update({ password }, { where: { id } })
  }

  async listById(id: number): Promise<User | null> {
    const user = await User.findByPk(id, {
      include: { association: 'roles' }
    })
    return user
  }

  async listAll(filters?: FilterUserType): Promise<ListUsersByAdminType> {

    const page = filters?.page ?? 1
    const perPage = filters?.perPage ?? 10
    const search = filters?.search?.trim() ?? ''

    delete filters?.page
    delete filters?.perPage
    delete filters?.search

    const where: WhereOptions<User> = { ...cleanObject(filters || {}) }

    // Exemplo de filtro (ajuste conforme seus campos)
    if (search) {
      where.name = { [Op.iLike]: `%${search}%` }
    }

    // Conta total de registros
    const count = await User.count({ where })

    const results = await User.findAll({
      where,
      include: { association: 'roles' },
      order: [['created_at', 'DESC'],],
      offset: (page - 1) * perPage,
      limit: perPage
    })

    const data = results.map(item => new ListUserByAdminDTO(item).getAll())

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

  async listUserByRegister(register: string): Promise<UserType | null> {
    const user = await User.findOne({
      include: { association: 'roles' },
      where: {
        register
      }
    })
    return user
  }


  async alter(id: number, newData: UpdateUserType) {
    await User.update(cleanObject(newData), { where: { id } })
  }

  async create(newData: CreateUserType): Promise<User> {
    try {
      const process = await User.create(newData)
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
    await User.destroy({ where: { id } })
  }
}