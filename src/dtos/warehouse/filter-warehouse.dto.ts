import z from 'zod';
import { WarehouseSchema } from './warehouse.schema';
import { DTO } from '../dto';
import { FilterSchema } from '../util/filter.schema';

export const FilterWarehouseSchema = FilterSchema(WarehouseSchema)

export type FilterWarehouseType = z.infer<typeof FilterWarehouseSchema>

export class FilterWarehouseDTO extends DTO<typeof FilterWarehouseSchema> {
  protected rules() {
    return FilterWarehouseSchema
  }
}