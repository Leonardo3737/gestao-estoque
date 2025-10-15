import z from 'zod';
import { DTO } from '../dto';
import { CreateStockSchema } from './create-stock.dto';

export const UpdateStockSchema = CreateStockSchema.partial()

export type UpdateStockType = z.infer<typeof UpdateStockSchema>

export class UpdateStockDTO extends DTO<typeof UpdateStockSchema> {
  protected rules() {
    return UpdateStockSchema
  }
}