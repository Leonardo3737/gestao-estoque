import { DatabaseError, ForeignKeyConstraintError, Transaction, UniqueConstraintError, ValidationError, WhereOptions } from "sequelize";
import { CreateTransactionType } from "../dtos/transaction/create-transaction.dto";
import { FilterTransactionType } from "../dtos/transaction/filter-transaction.dto";
import { ListTransactionDTO, ListTransactionsType, ListTransactionType } from "../dtos/transaction/list-transaction.dto";
import { UpdateTransactionType } from "../dtos/transaction/update-transaction.dto";
import TransactionModel from "../models/transaction.model";
import { cleanObject } from "../utils/cleanObject";
import { AppError } from "../errors/app.error";

export class TransactionRepository {
  async listById(id: number): Promise<ListTransactionType | null> {
    const transaction = await TransactionModel.findByPk(
      id,
      {
        include: [
          { association: 'user' },
          { association: 'transactionLocations' },
          {
            association: 'product',
            include: [{ association: 'category' }]
          },
          {
            association: 'transactionLocations',
            include: [{
              association: 'location',
              include: [
                {
                  association: 'aisle',
                  include: [{ association: 'warehouse' }]
                }
              ]
            }]
          },
        ]
      }
    )
    return transaction ? new ListTransactionDTO(transaction).getAll() : null
  }

  async listAll(filters?: FilterTransactionType): Promise<ListTransactionsType> {

    const page = filters?.page ?? 1
    const perPage = filters?.perPage ?? 10

    delete filters?.page
    delete filters?.perPage
    delete filters?.search

    const where: WhereOptions<TransactionModel> = { ...cleanObject(filters || {}) }

    const count = await TransactionModel.count({ where })

    const transactions = await TransactionModel.findAll({
      where,
      include: [{ association: 'product' }],
      order: [['created_at', 'DESC'],],
      offset: (page - 1) * perPage,
      limit: perPage
    })

    const data = transactions.map(transaction => new ListTransactionDTO(transaction).getAll())

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


  async alter(id: number, newData: UpdateTransactionType) {
    await TransactionModel.update(cleanObject(newData), { where: { id } })
  }

  async create(newData: CreateTransactionType, dbTransaction?: Transaction): Promise<TransactionModel> {
    try {
      const process = await TransactionModel.create(newData, (dbTransaction ? { transaction: dbTransaction } : {}))
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
    await TransactionModel.destroy({ where: { id } })
  }
}