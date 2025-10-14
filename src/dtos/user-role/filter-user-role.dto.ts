
import z from 'zod';
import { DTO } from '../dto';
import { UserRoleSchema } from './user-role.schema';

export const FilterUserRoleSchema = UserRoleSchema.partial()

export type FilterUserRoleType = z.infer<typeof FilterUserRoleSchema>

export class FilterUserRoleDTO extends DTO<typeof FilterUserRoleSchema> {
  protected rules() {
    return FilterUserRoleSchema
  }
}