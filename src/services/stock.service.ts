import { Transaction } from 'sequelize';
import { CreateStockType } from '../dtos/stock/create-stock.dto';
import { TransactionTypeEnum } from '../enums/transaction-type.enum';
import { AppError } from '../errors/app.error';
import Stock from '../models/stock.model';
import { StockRepository } from '../repositories/stock.repository';
import { calculateNewStock } from '../utils/calculateNewStock';
import { BaseService } from './base.service';

export class StockService extends BaseService<Stock> {
  constructor() {
    super(new StockRepository())
  }

  async executeTransactions(solicitations: CreateStockType[], transactioType: TransactionTypeEnum, dbTransaction: Transaction) {
    for (let solicitation of solicitations) {
      const stocks = await this.repository.listAll({
        productId: solicitation.productId,
        locationId: solicitation.locationId
      })

      const stock = stocks[ 0 ]

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
        return
      }

      await this.repository.alter(stock.id, {
        currentStock: calculateNewStock(stock.currentStock, transactioType, solicitation.currentStock)
      })
    }
  }
}