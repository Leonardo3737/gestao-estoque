
import z from 'zod';
import { DTO } from '../dto';
import { LocationSchema } from './location.schema';

export const UpdateLocationSchema = LocationSchema.partial()

export type UpdateLocationType = z.infer<typeof UpdateLocationSchema>

export class UpdateLocationDTO extends DTO<typeof UpdateLocationSchema> {
  protected rules() {
    return UpdateLocationSchema
  }
}