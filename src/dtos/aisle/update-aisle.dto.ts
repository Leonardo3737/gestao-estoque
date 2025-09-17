
import z from 'zod';
import { DTO } from '../dto';
import { AisleSchema } from './aisle.schema';

export const UpdateAisleSchema = AisleSchema.partial()

export type UpdateAisleType = z.infer<typeof UpdateAisleSchema>

export class UpdateAisleDTO extends DTO<typeof UpdateAisleSchema> {
  protected rules() {
    return UpdateAisleSchema
  }
}