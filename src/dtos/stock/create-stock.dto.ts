import z from 'zod';
import { DTO } from '../dto';
import { StockSchema } from './stock.schema';
import { CreateLocationSchema } from '../location/create-location.dto';

export const CreateStockSchema = StockSchema.omit({
  id: true,
  product: true,
  locationId: true,
  location: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true
}).extend({
  locationId: z.coerce.number().optional().nullable(),
  location: CreateLocationSchema.optional().nullable(),
}).refine(data => {
  if (!data.location && !data.locationId) {
    return false;
  }
  return true;
}, {
  message: "Either 'locationId' or 'location' must be provided."
})

export type CreateStockType = z.infer<typeof CreateStockSchema>

export class CreateStockDTO extends DTO<typeof CreateStockSchema> {
  protected rules() {
    return CreateStockSchema
  }
}