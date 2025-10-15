import { DatabaseError, ForeignKeyConstraintError, Op, Transaction, UniqueConstraintError, ValidationError, WhereOptions } from "sequelize";
import { CreateTransactionLocationType } from "../dtos/transaction-location/create-transaction-location.dto";
import { FilterTransactionLocationType } from "../dtos/transaction-location/filter-transaction-location.dto";
import TransactionLocation from "../models/transaction-location.model";
import { cleanObject } from "../utils/cleanObject";
import { AppError } from "../errors/app.error";
import { ListTransactionLocationType, ListTransactionLocationDTO, ListTransactionLocationsType } from "../dtos/transaction-location/list-transaction-location.dto";

export class TransactionLocationRepository {
  async listById(id: number): Promise<ListTransactionLocationType | null> {
    const transactionLocation = await TransactionLocation.findByPk(
      id,
      {
        include: [{ association: 'location' }]
      }
    )
    return transactionLocation ? new ListTransactionLocationDTO(transactionLocation).getAll() : null
  }

  async listAll(filters?: FilterTransactionLocationType): Promise<ListTransactionLocationsType> {

    const page = filters?.page ?? 1
    const perPage = filters?.perPage ?? 10
    
    delete filters?.page
    delete filters?.perPage
    delete filters?.search

    const where: WhereOptions<TransactionLocation> = { ...cleanObject(filters || {}) }

    // Conta total de registros
    const count = await TransactionLocation.count({ where })

    const results = await TransactionLocation.findAll({
      where,
      order: [['created_at', 'DESC']],
      offset: (page - 1) * perPage,
      limit: perPage
    })

    const data = results.map(item => new ListTransactionLocationDTO(item).getAll())

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

  async create(newData: CreateTransactionLocationType, dbTransaction?: Transaction): Promise<TransactionLocation> {
    try {
      const process = await TransactionLocation.create(newData, (dbTransaction ? { transaction: dbTransaction } : {}))
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
    await TransactionLocation.destroy({ where: { id } })
  }
}