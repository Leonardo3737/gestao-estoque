
import z from 'zod';
import { DTO } from '../dto';
import { RolesSchema } from './roles.schema';

export const CreateRolesSchema = RolesSchema.pick({
  role: true
})

export type CreateRolesType = z.infer<typeof CreateRolesSchema>

export class CreateRolesDTO extends DTO<typeof CreateRolesSchema> {
  protected rules() {
    return CreateRolesSchema
  }
}