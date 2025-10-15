import { Transaction } from 'sequelize';
import { CreateStockDTO, CreateStockType } from '../dtos/stock/create-stock.dto';
import { FilterStockDTO } from '../dtos/stock/filter-stock.dto';
import { ListStockDTO, ListStocksType, ListStockType } from '../dtos/stock/list-stock.dto';
import { UpdateStockDTO } from '../dtos/stock/update-stock.dto';
import { TransactionTypeEnum } from '../enums/transaction-type.enum';
import { AppError } from '../errors/app.error';
import { StockRepository } from "../repositories/stock.repository";
import { calculateNewStock } from '../utils/calculateNewStock';
import { LocationRepository } from '../repositories/location.repository';
import { AisleRepository } from '../repositories/aisle.repository';
import { CreateTransactionType } from '../dtos/transaction/create-transaction.dto';

export class StockService {
  private repository: StockRepository
  private locationRepository: LocationRepository
  private aisleRepository: AisleRepository

  constructor() {
    this.repository = new StockRepository()
    this.locationRepository = new LocationRepository()
    this.aisleRepository = new AisleRepository()
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

  async executeTransactions(transaction: CreateTransactionType, dbTransaction: Transaction) {
    let transactionAmount = 0
    for (let solicitation of transaction.createTransactionLocations) {
      transactionAmount += solicitation.quantity
      if (!solicitation.locationId) {
        const aisle = await this.aisleRepository.listById(solicitation.location!.aisleId);

        if (!aisle) {
          throw new AppError('Aisle not found.', 404)
        }
        if (aisle.warehouseId !== transaction.warehouseId) {
          throw new AppError('There is a location that does not correspond to the warehouse.', 400, 'LOCATION_WAREHOUSE_MISMATCH')
        }
        const location = (await this.locationRepository.listAll({ ...solicitation.location })).data[0];
        if (!location) {
          const newLocation = await this.locationRepository.create(solicitation.location!, dbTransaction)
          solicitation.locationId = newLocation.id;
        } else {
          solicitation.locationId = location.id;
        }

      } else {
        const location = await this.locationRepository.listById(solicitation.locationId);

        if (!location) {
          throw new AppError('Location not found.', 404)
        }

        if (location?.aisle.warehouseId !== transaction.warehouseId) {
          throw new AppError('There is a location that does not correspond to the warehouse.', 400, 'LOCATION_WAREHOUSE_MISMATCH')
        }
      }


      const stocks = await this.repository.listAll({
        productId: transaction.productId,
        locationId: solicitation.locationId
      })

      const stock = stocks.data[0]

      if (
        transaction.type === TransactionTypeEnum.OUTGOING && (
          !stock ||
          stock.currentStock < solicitation.quantity
        )
      ) {
        throw new AppError("Insufficient stock to complete the outgoing transaction.", 400, "INSUFFICIENT_STOCK");
      }

      if (!stock) {
        await this.repository.create({
          currentStock: solicitation.quantity,
          productId: transaction.productId,
          locationId: solicitation.locationId
        }, dbTransaction)
        continue
      }

      await this.repository.alter(stock.id, {
        currentStock: calculateNewStock(stock.currentStock, transaction.type, solicitation.quantity)
      })
    }
    return transactionAmount;
  }
}