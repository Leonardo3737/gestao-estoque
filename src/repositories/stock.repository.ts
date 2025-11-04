import { DatabaseError, ForeignKeyConstraintError, Transaction, UniqueConstraintError, ValidationError, WhereOptions } from "sequelize";
import { CreateStockType } from "../dtos/stock/create-stock.dto";
import { FilterStockType } from "../dtos/stock/filter-stock.dto";
import { ListStockDTO, ListStocksType, ListStockType } from "../dtos/stock/list-stock.dto";
import { UpdateStockType } from "../dtos/stock/update-stock.dto";
import { AppError } from "../errors/app.error";
import Stock from "../models/stock.model";
import { cleanObject } from "../utils/cleanObject";

export class StockRepository {
  async listById(id: number): Promise<ListStockType | null> {
    const stock = await Stock.findByPk(
      id,
      {
        include: [
          {
            association: 'location',
            include: [
              {
                association: 'aisle',
                include: [
                  {
                    association: 'warehouse'
                  }
                ]
              }
            ]
          },
          {
            association: 'product',
            include: [ { association: 'category' } ]
          }
        ]
      }
    )
    return stock ? new ListStockDTO(stock).getAll() : null
  }

  async listAll(filters?: FilterStockType): Promise<ListStocksType> {

    const page = filters?.page ?? 1
    const perPage = filters?.perPage ?? 10
    const warehouseId = filters?.warehouseId
    const aisleId = filters?.aisleId

    delete filters?.page
    delete filters?.perPage
    delete filters?.search
    delete filters?.warehouseId
    delete filters?.aisleId

    const where: WhereOptions<Stock> = { ...cleanObject(filters || {}) }

    // Conta total de registros
    const count = await Stock.count({
      where,
      distinct: true,
      col: 'id',
      include: [
        {
          association: 'location',
          required: true,
          include: [
            {
              association: 'aisle',
              required: !!aisleId || !!warehouseId,
              where: aisleId ? { id: aisleId } : {},
              include: [
                {
                  association: 'warehouse',
                  required: !!warehouseId,
                  where: warehouseId ? { id: warehouseId } : {}
                }
              ]
            }
          ]
        }
      ]
    });

    const results = await Stock.findAll({
      where,
      order: [ [ 'created_at', 'DESC' ] ],
      include: [
        {
          association: 'location',
          required: true,
          include: [
            {
              association: 'aisle',
              required: !!aisleId || !!warehouseId,
              where: aisleId ? { id: aisleId } : {},
              include: [
                {
                  association: 'warehouse',
                  required: !!warehouseId,
                  where: warehouseId ? { id: warehouseId } : {}
                }
              ]
            }
          ]
        },
        {
          association: 'product',
          include: [ { association: 'category' } ]
        }
      ],
      offset: (page - 1) * perPage,
      limit: perPage
    })

    const data = results.map(item => new ListStockDTO(item).getAll())

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

  async alter(id: number, newData: UpdateStockType) {
    await Stock.update(cleanObject(newData), { where: { id } })
  }

  async create(newData: CreateStockType, dbTransaction?: Transaction): Promise<Stock> {
    try {
      const process = await Stock.create(newData, (dbTransaction ? { transaction: dbTransaction } : {}))
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
    await Stock.destroy({ where: { id } })
  }
}