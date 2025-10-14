
import z from 'zod';
import { DTO } from '../dto';
import { CreateLocationSchema } from './create-location.dto';

export const UpdateLocationSchema = CreateLocationSchema.partial()

export type UpdateLocationType = z.infer<typeof UpdateLocationSchema>

export class UpdateLocationDTO extends DTO<typeof UpdateLocationSchema> {
  protected rules() {
    return UpdateLocationSchema
  }
}