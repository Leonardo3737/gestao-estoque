import Transaction from "../models/transaction.model";
import { BaseRepository } from './base.repository';

export class TransactionRepository extends BaseRepository<Transaction> {
  constructor() {
    super(Transaction)
  }
}