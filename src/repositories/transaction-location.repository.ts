
import TransactionLocation from '../models/transaction-location.model';
import { BaseRepository } from './base.repository';

export class TransactionLocationRepository extends BaseRepository<TransactionLocation> {
  constructor() {
    super(TransactionLocation)
  }
}