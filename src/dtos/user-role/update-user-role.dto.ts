
import z from 'zod';
import { DTO } from '../dto';
import { UserRoleSchema } from './user-role.schema';

export const UpdateUserRoleSchema = UserRoleSchema.partial()

export type UpdateUserRoleType = z.infer<typeof UpdateUserRoleSchema>

export class UpdateUserRoleDTO extends DTO<typeof UpdateUserRoleSchema> {
  protected rules() {
    return UpdateUserRoleSchema
  }
}