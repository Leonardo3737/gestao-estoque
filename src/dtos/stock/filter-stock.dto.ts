import z from 'zod';
import { DTO } from '../dto';
import { FilterSchema } from '../util/filter.schema';
import { StockSchema } from './stock.schema';

export const FilterStockSchema = FilterSchema(StockSchema.extend({
  warehouseId: z.coerce.number().optional().nullable(),
  aisleId: z.coerce.number().optional().nullable(),
}))

export type FilterStockType = z.infer<typeof FilterStockSchema>

export class FilterStockDTO extends DTO<typeof FilterStockSchema> {
  protected rules() {
    return FilterStockSchema
  }
}