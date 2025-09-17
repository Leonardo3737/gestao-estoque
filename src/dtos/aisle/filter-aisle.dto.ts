import z from 'zod';
import { DTO } from '../dto';
import { AisleSchema } from './aisle.schema';

export const FilterAisleSchema = AisleSchema.partial()

export type FilterAisleType = z.infer<typeof FilterAisleSchema>

export class FilterAisleDTO extends DTO<typeof FilterAisleSchema> {
  protected rules() {
    return FilterAisleSchema
  }
}