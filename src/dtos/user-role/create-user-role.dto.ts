
import z from 'zod';
import { DTO } from '../dto';
import { UserRoleSchema } from './user-role.schema';

export const CreateUserRoleSchema = UserRoleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type CreateUserRoleType = z.infer<typeof CreateUserRoleSchema>

export class CreateUserRoleDTO extends DTO<typeof CreateUserRoleSchema> {
  protected rules() {
    return CreateUserRoleSchema
  }
}