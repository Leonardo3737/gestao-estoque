import z from 'zod';
import { ProductSchema } from '../product/product.schema';
import { LocationSchema } from '../location/location.schema';

export const StockSchema = z.object({
  id: z.number().int(),
  productId: z.number().int(),
  get product() {
    return ProductSchema.optional()
  },
  locationId: z.number().int(),
  get location() {
    return LocationSchema.optional()
  },
  currentStock: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
})

export type StockType = z.infer<typeof StockSchema>