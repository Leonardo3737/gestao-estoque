
import z from 'zod';
import { DTO } from '../dto';
import { UserRoleSchema } from './user-role.schema';
import { ResponseSchema } from '../util/response.schema';

export const ListUserRoleSchema = UserRoleSchema

export type ListUserRoleType = z.infer<typeof ListUserRoleSchema>

export class ListUserRoleDTO extends DTO<typeof ListUserRoleSchema> {
  protected rules() {
    return ListUserRoleSchema
  }
}

export const ListUserRolesSchema = ResponseSchema(UserRoleSchema)

export type ListUserRolesType = z.infer<typeof ListUserRolesSchema>

export class ListUserRolesDTO extends DTO<typeof ListUserRolesSchema> {
  protected rules() {
    return ListUserRolesSchema
  }
}