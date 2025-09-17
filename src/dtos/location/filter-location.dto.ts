import z from 'zod';
import { DTO } from '../dto';
import { LocationSchema } from './location.schema';

export const FilterLocationSchema = LocationSchema.partial()

export type FilterLocationType = z.infer<typeof FilterLocationSchema>

export class FilterLocationDTO extends DTO<typeof FilterLocationSchema> {
  protected rules() {
    return FilterLocationSchema
  }
}