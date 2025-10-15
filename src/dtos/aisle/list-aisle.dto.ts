
import z from 'zod';
import { DTO } from '../dto';
import { AisleSchema } from './aisle.schema';
import { ResponseSchema } from '../util/response.schema';

export const ListAisleSchema = AisleSchema

export type ListAisleType = z.infer<typeof ListAisleSchema>

export class ListAisleDTO extends DTO<typeof ListAisleSchema> {
  protected rules() {
    return ListAisleSchema
  }
}

export const ListAislesSchema = ResponseSchema(AisleSchema)

export type ListAislesType = z.infer<typeof ListAislesSchema>

export class ListAislesDTO extends DTO<typeof ListAislesSchema> {
  protected rules() {
    return ListAislesSchema
  }
}