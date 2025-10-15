import z from 'zod';
import { DTO } from '../dto';
import { StockSchema } from './stock.schema';
import { FilterSchema } from '../util/filter.schema';

export const FilterStockSchema = FilterSchema(StockSchema)

export type FilterStockType = z.infer<typeof FilterStockSchema>

export class FilterStockDTO extends DTO<typeof FilterStockSchema> {
  protected rules() {
    return FilterStockSchema
  }
}