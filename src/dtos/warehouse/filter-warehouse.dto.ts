import z from 'zod';
import { WarehouseSchema } from './warehouse.schema';
import { DTO } from '../dto';

export const FilterWarehouseSchema = WarehouseSchema.partial()

export type FilterWarehouseType = z.infer<typeof FilterWarehouseSchema>

export class FilterWarehouseDTO extends DTO<typeof FilterWarehouseSchema> {
  protected rules() {
    return FilterWarehouseSchema
  }
}