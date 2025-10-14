
import z from 'zod';
import { DTO } from '../dto';
import { CreateUserRoleSchema } from './create-user-role.dto';

export const UpdateUserRoleSchema = CreateUserRoleSchema.partial()

export type UpdateUserRoleType = z.infer<typeof UpdateUserRoleSchema>

export class UpdateUserRoleDTO extends DTO<typeof UpdateUserRoleSchema> {
  protected rules() {
    return UpdateUserRoleSchema
  }
}