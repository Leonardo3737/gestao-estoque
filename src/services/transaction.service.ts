import sequelize from '../config/db-connection';
import { CreateStockType } from '../dtos/stock/create-stock.dto';
import { CreateTransactionDTO, CreateTransactionType } from '../dtos/transaction/create-transaction.dto';
import { FilterTransactionDTO } from '../dtos/transaction/filter-transaction.dto';
import { ListTransactionDTO, ListTransactionsType, ListTransactionType } from '../dtos/transaction/list-transaction.dto';
import { UpdateTransactionDTO } from '../dtos/transaction/update-transaction.dto';
import { AppError } from '../errors/app.error';
import { ProductRepository } from '../repositories/product.repository';
import { TransactionRepository } from '../repositories/transaction.repository';
import { calculateNewStock } from '../utils/calculateNewStock';
import { StockService } from './stock.service';
import { TransactionLocationService } from './transaction-location.service';

export class TransactionService {
  private repository: TransactionRepository
  private productRepository: ProductRepository
  private transactionLocationService: TransactionLocationService
  private stockService: StockService

  constructor() {
    this.repository = new TransactionRepository()
    this.productRepository = new ProductRepository()
    this.transactionLocationService = new TransactionLocationService()
    this.stockService = new StockService()
  }

  async create(newTransactionDTO: CreateTransactionDTO): Promise<ListTransactionType> {
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

  async alter(id: number, dto: UpdateTransactionDTO): Promise<void> {
      const obj = dto.getAll()
      await this.listById(id)
      await this.repository.alter(id, obj)
    }
  
    async delete(id: number): Promise<void> {
      await this.listById(id)
      await this.repository.delete(id)
    }
  
    async listById(id: number): Promise<ListTransactionType> {
      const obj = await this.repository.listById(id)
  
      if (!obj) {
        throw new AppError('Object not found', 404)
      }
  
      return new ListTransactionDTO(obj).getAll()
    }
  
    async listAll(filter?: FilterTransactionDTO): Promise<ListTransactionsType> {
      const objs = await this.repository.listAll(filter?.getAll())
      return objs
    }
}