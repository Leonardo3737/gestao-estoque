import { col, fn } from "sequelize";
import { KpiType } from "../dtos/kpi/kpi.schema";
import Stock from "../models/stock.model";
import { BaseRepository } from './base.repository';

export class StockRepository extends BaseRepository<Stock> {
  constructor() {
    super(Stock)
  }
}