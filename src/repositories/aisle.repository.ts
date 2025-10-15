import { DatabaseError, ForeignKeyConstraintError, Op, UniqueConstraintError, ValidationError, WhereOptions } from "sequelize";
import { CreateAisleType } from "../dtos/aisle/create-aisle.dto";
import { FilterAisleType } from "../dtos/aisle/filter-aisle.dto";
import { ListAisleDTO, ListAislesType } from "../dtos/aisle/list-aisle.dto";
import { UpdateAisleType } from "../dtos/aisle/update-aisle.dto";
import Aisle from "../models/aisle.model";
import { cleanObject } from "../utils/cleanObject";
import { AppError } from "../errors/app.error";

export class AisleRepository {

  async listById(id: number): Promise<Aisle | null> {
    const transaction = await Aisle.findByPk(
      id,
      {
        include: [{ association: 'warehouse' }]
      }
    )
    return transaction ? new ListAisleDTO(transaction).getAll() as Aisle : null
  }

  async listAll(filters?: FilterAisleType): Promise<ListAislesType> {

    const page = filters?.page ?? 1
    const perPage = filters?.perPage ?? 10
    const search = filters?.search?.trim() ?? ''

    delete filters?.page
    delete filters?.perPage
    delete filters?.search

    const where: WhereOptions<Aisle> = { ...cleanObject(filters || {}) }

    // Exemplo de filtro (ajuste conforme seus campos)
    if (search) {
      where.name = { [Op.iLike]: `%${search}%` }
    }

    // Conta total de registros
    const count = await Aisle.count({ where })

    const results = await Aisle.findAll({
      where,
      include: [{ association: 'warehouse' }],
      order: [['created_at', 'DESC']],
      offset: (page - 1) * perPage,
      limit: perPage
    })

    const data = results.map(item => new ListAisleDTO(item).getAll())

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



  async alter(id: number, newData: UpdateAisleType) {
    await Aisle.update(cleanObject(newData), { where: { id } })
  }

  async create(newData: CreateAisleType): Promise<Aisle> {
    try {
      const process = await Aisle.create(newData)
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
    await Aisle.destroy({ where: { id } })
  }
}