import TransactionLocation from '../models/transaction-location.model';
import { TransactionLocationRepository } from '../repositories/transaction-location.repository';
import { BaseService } from './base.service';

export class TransactionLocationService extends BaseService<TransactionLocation> {
  constructor() {
    super(new TransactionLocationRepository())
  }
}