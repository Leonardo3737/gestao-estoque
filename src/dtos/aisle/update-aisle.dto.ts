
import z from 'zod';
import { DTO } from '../dto';
import { CreateAisleSchema } from './create-aisle.dto';

export const UpdateAisleSchema = CreateAisleSchema.partial()

export type UpdateAisleType = z.infer<typeof UpdateAisleSchema>

export class UpdateAisleDTO extends DTO<typeof UpdateAisleSchema> {
  protected rules() {
    return UpdateAisleSchema
  }
}