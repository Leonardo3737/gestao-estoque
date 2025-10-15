import { Transaction } from 'sequelize';
import { CreateTransactionLocationByTransactionType, CreateTransactionLocationType } from '../dtos/transaction-location/create-transaction-location.dto';
import { CreateTransactionLocationDTO } from '../dtos/transaction-location/create-transaction-location.dto';
import { FilterTransactionLocationDTO } from '../dtos/transaction-location/filter-transaction-location.dto';
import { ListTransactionLocationDTO, ListTransactionLocationsType, ListTransactionLocationType } from '../dtos/transaction-location/list-transaction-location.dto';
import { AppError } from '../errors/app.error';
import { TransactionLocationRepository } from "../repositories/transaction-location.repository";

export class TransactionLocationService {
  repository
  constructor() {
    this.repository = new TransactionLocationRepository()
  }
  async executeTransactions(solicitations: CreateTransactionLocationByTransactionType, transactionId: number, dbTransaction: Transaction) {
    
    for (let solicitation of solicitations) {
      
      await this.repository.create({
        ...(solicitation as CreateTransactionLocationType),
        transactionId: transactionId
      }, dbTransaction)
    }
  }

  async create(dto: CreateTransactionLocationDTO): Promise<ListTransactionLocationType> {
    const obj = dto.getAll()
    const newTransactionLocation = await this.repository.create(obj)
    return new ListTransactionLocationDTO(newTransactionLocation).getAll()
  }

  async delete(id: number): Promise<void> {
    await this.listById(id)
    await this.repository.delete(id)
  }

  async listById(id: number): Promise<ListTransactionLocationType> {
    const obj = await this.repository.listById(id)

    if (!obj) {
      throw new AppError('Object not found', 404)
    }

    return new ListTransactionLocationDTO(obj).getAll()
  }

  async listAll(filter?: FilterTransactionLocationDTO): Promise<ListTransactionLocationsType> {
    const objs = await this.repository.listAll(filter?.getAll())
    return objs
  }
}