
import z from 'zod';
import { DTO } from '../dto';
import { UserRoleSchema } from './user-role.schema';

export const ListUserRoleSchema = UserRoleSchema

export type ListUserRoleType = z.infer<typeof ListUserRoleSchema>

export class ListUserRoleDTO extends DTO<typeof ListUserRoleSchema> {
  protected rules() {
    return ListUserRoleSchema
  }
}