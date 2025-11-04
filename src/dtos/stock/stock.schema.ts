import z from 'zod';
import { ProductSchema } from '../product/product.schema';
import { LocationSchema } from '../location/location.schema';

export const StockSchema = z.object({
  id: z.coerce.number().int(),
  productId: z.coerce.number().int(),
  get product() {
    return ProductSchema.optional()
  },
  locationId: z.coerce.number().int(),
  get location() {
    return LocationSchema.optional()
  },
  currentStock: z.coerce.number().int(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
})

export type StockType = z.infer<typeof StockSchema>