import z from 'zod';
import { DTO } from '../dto';
import { LocationSchema } from './location.schema';
import { FilterSchema } from '../util/filter.schema';

export const FilterLocationSchema = FilterSchema(LocationSchema)

export type FilterLocationType = z.infer<typeof FilterLocationSchema>

export class FilterLocationDTO extends DTO<typeof FilterLocationSchema> {
  protected rules() {
    return FilterLocationSchema
  }
}