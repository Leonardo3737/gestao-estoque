import Stock from "../models/stock.model";
import { BaseRepository } from './base.repository';

export class StockRepository extends BaseRepository<Stock> {
  constructor() {
    super(Stock)
  }
}