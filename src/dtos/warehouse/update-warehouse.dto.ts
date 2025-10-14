import z from 'zod';
import { DTO } from '../dto';
import { CreateWarehouseSchema } from './create-warehouse.dto';

export const UpdateWarehouseSchema = CreateWarehouseSchema.partial()

export type UpdateWarehouseType = z.infer<typeof UpdateWarehouseSchema>

export class UpdateWarehouseDTO extends DTO<typeof UpdateWarehouseSchema> {
  protected rules() {
    return UpdateWarehouseSchema
  }
}