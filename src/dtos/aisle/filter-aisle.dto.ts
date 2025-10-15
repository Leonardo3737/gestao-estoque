import z from 'zod';
import { DTO } from '../dto';
import { AisleSchema } from './aisle.schema';
import { FilterSchema } from '../util/filter.schema';

export const FilterAisleSchema = FilterSchema(AisleSchema)

export type FilterAisleType = z.infer<typeof FilterAisleSchema>

export class FilterAisleDTO extends DTO<typeof FilterAisleSchema> {
  protected rules() {
    return FilterAisleSchema
  }
}