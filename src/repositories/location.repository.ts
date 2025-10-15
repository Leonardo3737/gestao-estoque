import { DatabaseError, ForeignKeyConstraintError, UniqueConstraintError, ValidationError } from "sequelize";
import { FilterLocationType } from "../dtos/location/filter-location.dto";
import { ListLocationDTO, ListLocationsType } from "../dtos/location/list-location.dto";
import Location from "../models/location.model";
import { AppError } from "../errors/app.error";
import { CreateLocationType } from "../dtos/location/create-location.dto";
import { UpdateLocationType } from "../dtos/location/update-location.dto";
import { cleanObject } from "../utils/cleanObject";

export class LocationRepository {

  async listById(id: number): Promise<Location | null> {
    const transaction = await Location.findByPk(
      id,
      {
        include: [
          {
            association: 'aisle',
            include: [{ association: 'warehouse' }]
          },
          {
            association: 'stock',
            include: [
              {
                association: 'product'
              }
            ]
          }
        ],
      }
    )
    return transaction ? new ListLocationDTO(transaction).getAll() as Location : null
  }

  async listAll(filters?: FilterLocationType): Promise<ListLocationsType> {

    const page = filters?.page ?? 1
    const perPage = filters?.perPage ?? 10

    delete filters?.page
    delete filters?.perPage
    delete filters?.search

    // Conta total de registros
    const count = await Location.count({ where: { ...filters } })

    const transactions = await Location.findAll({
      where: { ...filters },
      include: [
        {
          association: 'aisle',
          include: [{ association: 'warehouse' }]
        }
      ],
      order: [['created_at', 'DESC'],],
      offset: (page - 1) * perPage,
      limit: perPage
    })

    const data = transactions.map(transaction => new ListLocationDTO(transaction).getAll())

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

  async alter(id: number, newData: UpdateLocationType) {
    await Location.update(cleanObject(newData), { where: { id } })
  }

  async create(newData: CreateLocationType): Promise<Location> {
    try {
      const process = await Location.create(newData)
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
    await Location.destroy({ where: { id } })
  }
}