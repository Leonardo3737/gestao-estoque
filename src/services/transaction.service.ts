import sequelize from '../config/db-connection';
import { DTO } from '../dtos/dto';
import { CreateTransactionType } from '../dtos/transaction/create-transaction.dto';
import { ListTransactionDTO, ListTransactionType } from '../dtos/transaction/list-transaction.dto';
import { TransactionType } from '../dtos/transaction/transaction.schema';
import { TransactionTypeEnum } from '../enums/transaction-type.enum';
import { AppError } from '../errors/app.error';
import Transaction from '../models/transaction.model';
import { ProductRepository } from '../repositories/product.repository';
import { TransactionRepository } from '../repositories/transaction.repository';
import { BaseService } from './base.service';

export class TransactionService extends BaseService<Transaction> {
  private productRepository: ProductRepository
  constructor() {
    super(new TransactionRepository())
    this.productRepository = new ProductRepository()
  }

  override async create(newTransactionDTO: DTO<any>): Promise<ListTransactionType> {
    const t = await sequelize.transaction()

    try {
      const newTransaction = newTransactionDTO.getAll() as CreateTransactionType

      const product = await this.productRepository.listById(newTransaction.productId)

      if (!product) {
        throw new AppError('product not found', 404)
      }

      const transaction = await this.repository.create(newTransaction, t)

      const currentStock = product.currentStock || 0

      await this.productRepository.alter(newTransaction.productId, {
        currentStock:
          newTransaction.type === TransactionTypeEnum.INCOMING ?
            currentStock + newTransaction.quantity :
            currentStock - newTransaction.quantity
      }, t)

      await t.commit()
      return new ListTransactionDTO(transaction).getAll()
    }
    catch (err) {
      await t.rollback()
      throw err
    }
  }
}