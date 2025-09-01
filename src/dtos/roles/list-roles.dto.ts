
import z from 'zod';
import { DTO } from '../dto';
import { RolesSchema } from './roles.schema';

export const ListRolesSchema = RolesSchema

export type ListRolesType = z.infer<typeof ListRolesSchema>

export class ListRolesDTO extends DTO<typeof ListRolesSchema> {
  protected rules() {
    return ListRolesSchema
  }
}