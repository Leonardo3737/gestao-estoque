
import z from 'zod';
import { DTO } from '../dto';
import { RolesSchema } from './roles.schema';

export const FilterRolesSchema = RolesSchema.partial()

export type FilterRolesType = z.infer<typeof FilterRolesSchema>

export class FilterRolesDTO extends DTO<typeof FilterRolesSchema> {
  protected rules() {
    return FilterRolesSchema
  }
}