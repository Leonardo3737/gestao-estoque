
import z from 'zod';
import { DTO } from '../dto';
import { UserRoleSchema } from './user-role.schema';
import { FilterSchema } from '../util/filter.schema';

export const FilterUserRoleSchema = FilterSchema(UserRoleSchema)

export type FilterUserRoleType = z.infer<typeof FilterUserRoleSchema>

export class FilterUserRoleDTO extends DTO<typeof FilterUserRoleSchema> {
  protected rules() {
    return FilterUserRoleSchema
  }
}