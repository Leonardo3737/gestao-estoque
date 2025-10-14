
import z from 'zod';
import { DTO } from '../dto';
import { UserSchema } from './user.schema';

export const FilterUserSchema = UserSchema.partial()

export type FilterUserType = z.infer<typeof FilterUserSchema>

export class FilterUserDTO extends DTO<typeof FilterUserSchema> {
  protected rules() {
    return FilterUserSchema
  }
}