import { DatabaseError, ForeignKeyConstraintError, Op, UniqueConstraintError, ValidationError, WhereOptions } from "sequelize";
import { CreateWarehouseType } from "../dtos/warehouse/create-warehouse.dto";
import { FilterWarehouseType } from "../dtos/warehouse/filter-warehouse.dto";
import { UpdateWarehouseType } from "../dtos/warehouse/update-warehouse.dto";
import Warehouse from "../models/warehouse.model";
import { cleanObject } from "../utils/cleanObject";
import { AppError } from "../errors/app.error";
import { ListWarehouseType, ListWarehouseDTO, ListWarehousesType } from "../dtos/warehouse/list-warehouse.dto";

export class WarehouseRepository {
  async listById(id: number): Promise<ListWarehouseType | null> {
    const warehouse = await Warehouse.findByPk(id)
    return warehouse ? new ListWarehouseDTO(warehouse).getAll() : null
  }

  async listAll(filters?: FilterWarehouseType): Promise<ListWarehousesType> {

    const page = filters?.page ?? 1
    const perPage = filters?.perPage ?? 10
    const search = filters?.search?.trim() ?? ''

    delete filters?.page
    delete filters?.perPage
    delete filters?.search

    const where: WhereOptions<Warehouse> = { ...cleanObject(filters || {}) }

    if (search) {
      where.name = { [Op.iLike]: `%${search}%` }
    }

    // Conta total de registros
    const count = await Warehouse.count({ where })

    const results = await Warehouse.findAll({
      where,
      order: [['created_at', 'DESC']],
      offset: (page - 1) * perPage,
      limit: perPage
    })

    const data = results.map(item => new ListWarehouseDTO(item).getAll())

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

  async alter(id: number, newData: UpdateWarehouseType) {
    await Warehouse.update(cleanObject(newData), { where: { id } })
  }

  async create(newData: CreateWarehouseType): Promise<Warehouse> {
    try {
      const process = await Warehouse.create(newData)
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
    await Warehouse.destroy({ where: { id } })
  }
}