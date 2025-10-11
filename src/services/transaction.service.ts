import sequelize from '../config/db-connection';
import { DTO } from '../dtos/dto';
import { CreateTransactionType } from '../dtos/transaction/create-transaction.dto';
import { ListTransactionDTO, ListTransactionType } from '../dtos/transaction/list-transaction.dto';
import { TransactionTypeEnum } from '../enums/transaction-type.enum';
import { AppError } from '../errors/app.error';
import Transaction from '../models/transaction.model';
import { ProductRepository } from '../repositories/product.repository';
import { TransactionLocationRepository } from '../repositories/transaction-location.repository';
import { TransactionRepository } from '../repositories/transaction.repository';
import { BaseService } from './base.service';

export class TransactionService extends BaseService<Transaction> {
  private productRepository: ProductRepository
  private transactionLocationRepository: TransactionLocationRepository

  constructor() {
    super(new TransactionRepository())
    this.productRepository = new ProductRepository()
    this.transactionLocationRepository = new TransactionLocationRepository()
  }

  override async create(newTransactionDTO: DTO<any>): Promise<ListTransactionType> {
    const dbTransaction = await sequelize.transaction()

    try {
      const newTransaction = newTransactionDTO.getAll() as CreateTransactionType

      const product = await this.productRepository.listById(newTransaction.productId)

      if (!product) {
        throw new AppError('product not found', 404)
      }

      const transaction: Transaction = await this.repository.create(newTransaction, dbTransaction) as Transaction

      const currentStock = product.currentStock || 0
      let newStock = 0

      newTransaction.createTransactionLocations.forEach(async (transactionLocation) => {
        newStock += transactionLocation.quantity
        await this.transactionLocationRepository.create({
          ...transactionLocation,
          transactionId: transaction.id
        }, dbTransaction)
      });

      await this.productRepository.alter(newTransaction.productId, {
        currentStock:
          newTransaction.type === TransactionTypeEnum.INCOMING ?
            currentStock + newStock :
            currentStock - newStock
      }, dbTransaction)

      await dbTransaction.commit()
      return new ListTransactionDTO(transaction).getAll()
    }
    catch (err) {
      await dbTransaction.rollback()
      throw err
    }
  }
}