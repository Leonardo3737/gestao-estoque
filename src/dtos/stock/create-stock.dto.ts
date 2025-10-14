import z from 'zod';
import { DTO } from '../dto';
import { StockSchema } from './stock.schema';

export const CreateStockSchema = StockSchema.omit({
  id: true,
  product: true,
  location: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true
})

export type CreateStockType = z.infer<typeof CreateStockSchema>

export class CreateStockDTO extends DTO<typeof CreateStockSchema> {
  protected rules() {
    return CreateStockSchema
  }
}