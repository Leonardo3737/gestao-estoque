import z from 'zod';
import { DTO } from '../dto';
import { StockSchema } from './stock.schema';

export const FilterStockSchema = StockSchema.partial()

export type FilterStockType = z.infer<typeof FilterStockSchema>

export class FilterStockDTO extends DTO<typeof FilterStockSchema> {
  protected rules() {
    return FilterStockSchema
  }
}