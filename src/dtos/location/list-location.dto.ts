
import z from 'zod';
import { DTO } from '../dto';
import { LocationSchema } from './location.schema';
import { ResponseSchema } from '../util/response.schema';

export const ListLocationSchema = LocationSchema

export type ListLocationType = z.infer<typeof ListLocationSchema>

export class ListLocationDTO extends DTO<typeof ListLocationSchema> {
  protected rules() {
    return ListLocationSchema
  }
}

export const ListLocationsSchema = ResponseSchema(LocationSchema)

export type ListLocationsType = z.infer<typeof ListLocationsSchema>

export class ListLocationsDTO extends DTO<typeof ListLocationsSchema> {
  protected rules() {
    return ListLocationsSchema
  }
}