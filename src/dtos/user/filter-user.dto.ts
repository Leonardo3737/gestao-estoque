
import z from 'zod';
import { DTO } from '../dto';
import { UserSchema } from './user.schema';
import { FilterSchema } from '../util/filter.schema';

export const FilterUserSchema = FilterSchema(UserSchema)

export type FilterUserType = z.infer<typeof FilterUserSchema>

export class FilterUserDTO extends DTO<typeof FilterUserSchema> {
  protected rules() {
    return FilterUserSchema
  }
}