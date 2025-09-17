
import z from 'zod';
import { DTO } from '../dto';
import { AisleSchema } from './aisle.schema';

export const ListAisleSchema = AisleSchema

export type ListAisleType = z.infer<typeof ListAisleSchema>

export class ListAisleDTO extends DTO<typeof ListAisleSchema> {
  protected rules() {
    return ListAisleSchema
  }
}