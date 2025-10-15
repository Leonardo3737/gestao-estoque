import { Transaction } from 'sequelize';
import { CreateStockDTO, CreateStockType } from '../dtos/stock/create-stock.dto';
import { FilterStockDTO } from '../dtos/stock/filter-stock.dto';
import { ListStockDTO, ListStocksType, ListStockType } from '../dtos/stock/list-stock.dto';
import { UpdateStockDTO } from '../dtos/stock/update-stock.dto';
import { TransactionTypeEnum } from '../enums/transaction-type.enum';
import { AppError } from '../errors/app.error';
import { StockRepository } from "../repositories/stock.repository";
import { calculateNewStock } from '../utils/calculateNewStock';

export class StockService  {
repository
  constructor() {
    this.repository = new StockRepository()
  }

  async create(dto: CreateStockDTO): Promise<ListStockType> {
    const obj = dto.getAll()
    const newStock = await this.repository.create(obj)
    return new ListStockDTO(newStock).getAll()
  }

  async alter(id: number, dto: UpdateStockDTO): Promise<void> {
    const obj = dto.getAll()
    await this.listById(id)
    await this.repository.alter(id, obj)
  }

  async delete(id: number): Promise<void> {
    await this.listById(id)
    await this.repository.delete(id)
  }

  async listById(id: number): Promise<ListStockType> {
    const obj = await this.repository.listById(id)

    if (!obj) {
      throw new AppError('Object not found', 404)
    }

    return new ListStockDTO(obj).getAll()
  }

  async listAll(filter?: FilterStockDTO): Promise<ListStocksType> {
    const objs = await this.repository.listAll(filter?.getAll())
    return objs
  }

  async executeTransactions(solicitations: CreateStockType[], transactioType: TransactionTypeEnum, dbTransaction: Transaction) {
    for (let solicitation of solicitations) {

      const stocks = await this.repository.listAll({
        productId: solicitation.productId,
        locationId: solicitation.locationId
      })

      const stock = stocks.data[ 0 ]

      if (
        transactioType === TransactionTypeEnum.OUTGOING && (
          !stock ||
          stock.currentStock < solicitation.currentStock
        )
      ) {
        throw new AppError("Insufficient stock to complete the outgoing transaction.", 400, "INSUFFICIENT_STOCK");
      }

      if (!stock) {
        await this.repository.create(solicitation, dbTransaction)
        continue
      }      

      await this.repository.alter(stock.id, {
        currentStock: calculateNewStock(stock.currentStock, transactioType, solicitation.currentStock)
      })
    }
  }
}