import z from 'zod';
import { WarehouseSchema } from './warehouse.schema';
import { DTO } from '../dto';

export const UpdateWarehouseSchema = WarehouseSchema.omit({
  name: true,
  address: true,
}).partial()

export type UpdateWarehouseType = z.infer<typeof UpdateWarehouseSchema>

export class UpdateWarehouseDTO extends DTO<typeof UpdateWarehouseSchema> {
  protected rules() {
    return UpdateWarehouseSchema
  }
}