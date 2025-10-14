import sequelize from '../config/db-connection';
import { DTO } from '../dtos/dto';
import { CreateStockType } from '../dtos/stock/create-stock.dto';
import { CreateTransactionType } from '../dtos/transaction/create-transaction.dto';
import { ListTransactionDTO, ListTransactionType } from '../dtos/transaction/list-transaction.dto';
import { AppError } from '../errors/app.error';
import Transaction from '../models/transaction.model';
import { ProductRepository } from '../repositories/product.repository';
import { TransactionRepository } from '../repositories/transaction.repository';
import { calculateNewStock } from '../utils/calculateNewStock';
import { BaseService } from './base.service';
import { StockService } from './stock.service';
import { TransactionLocationService } from './transaction-location.service';

export class TransactionService extends BaseService<Transaction> {
  private productRepository: ProductRepository
  private transactionLocationService: TransactionLocationService
  private stockService: StockService

  constructor() {
    super(new TransactionRepository())
    this.productRepository = new ProductRepository()
    this.transactionLocationService = new TransactionLocationService()
    this.stockService = new StockService()
  }

  override async create(newTransactionDTO: DTO<any>): Promise<ListTransactionType> {
    const dbTransaction = await sequelize.transaction()

    try {
      const newTransaction = newTransactionDTO.getAll() as CreateTransactionType
      
      const stockSolicitations: CreateStockType[] = newTransaction.createTransactionLocations.map(tl => ({
        productId: newTransaction.productId,
        locationId: tl.locationId,
        currentStock: tl.quantity
      }))
      
      const product = await this.productRepository.listById(newTransaction.productId)

      if (!product) {
        throw new AppError('product not found', 404)
      }

      await this.stockService.executeTransactions(stockSolicitations, newTransaction.type, dbTransaction)

      const transaction = await this.repository.create(newTransaction, dbTransaction)

      const globalCurrentStock = product.currentStock || 0

      let transactionAmount = await this.transactionLocationService.executeTransactions(newTransaction.createTransactionLocations, transaction.id, dbTransaction)


      await this.productRepository.alter(newTransaction.productId, {
        currentStock: calculateNewStock(globalCurrentStock, newTransaction.type, transactionAmount)
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