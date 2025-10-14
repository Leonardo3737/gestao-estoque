import { Transaction } from 'sequelize';
import { CreateTransactionLocationByTransactionType } from '../dtos/transaction-location/create-transaction-location.dto';
import TransactionLocation from '../models/transaction-location.model';
import { TransactionLocationRepository } from '../repositories/transaction-location.repository';
import { BaseService } from './base.service';

export class TransactionLocationService extends BaseService<TransactionLocation> {
  constructor() {
    super(new TransactionLocationRepository())
  }

  async executeTransactions(solicitations: CreateTransactionLocationByTransactionType, transactionId: number, dbTransaction: Transaction): Promise<number> {
    let transactionAmount = 0

    for (let solicitation of solicitations) {
      transactionAmount += solicitation.quantity
      await this.repository.create({
        ...solicitation,
        transactionId: transactionId
      }, dbTransaction)
    }
    return transactionAmount
  }
}