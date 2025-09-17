
import z from 'zod';
import { DTO } from '../dto';
import { LocationSchema } from './location.schema';

export const ListLocationSchema = LocationSchema

export type ListLocationType = z.infer<typeof ListLocationSchema>

export class ListLocationDTO extends DTO<typeof ListLocationSchema> {
  protected rules() {
    return ListLocationSchema
  }
}