import { FilterTransactionType } from "../dtos/transaction/filter-transaction.dto";
import { ListTransactionDTO } from "../dtos/transaction/list-transaction.dto";
import Transaction from "../models/transaction.model";
import { BaseRepository } from './base.repository';

export class TransactionRepository extends BaseRepository<Transaction> {
  constructor() {
    super(Transaction)
  }

  async listById(id: number): Promise<Transaction | null> {
    const transaction = await Transaction.findByPk(
      id,
      {
        include: [
          { association: 'user' },
          { association: 'transactionLocations' },
          {
            association: 'product',
            include: [ { association: 'category' } ]
          },
          {
            association: 'transactionLocations',
            include: [ {
              association: 'location',
              include: [
                {
                  association: 'aisle',
                  include: [ { association: 'warehouse' } ]
                }
              ]
            } ]
          },
        ]
      }
    )
    return transaction ? new ListTransactionDTO(transaction).getAll() as Transaction : null
  }

  async listAll(filters?: FilterTransactionType): Promise<Transaction[]> {

    const transactions = await Transaction.findAll({
      where: {
        ...filters
      },
      include: [
        {
          association: 'transactionLocations',
          include: [ { association: 'location' } ]
        },
        {
          association: 'product',
          include: [ { association: 'category' } ]
        }
      ]
    })

    const aux = transactions.map(transaction => {
      return new ListTransactionDTO(transaction).getAll()
    })

    return aux as Transaction[]
  }
}