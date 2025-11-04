import z from 'zod';
import { LocationSchema } from '../location/location.schema';
import { ProductSchema } from '../product/product.schema';

export const StockSchema = z.object({
  id: z.coerce.number().int(),
  productId: z.coerce.number().int(),
  get product() {
    return ProductSchema.optional().nullable()
  },
  locationId: z.coerce.number().int(),
  get location() {
    return LocationSchema.optional().nullable()
  },
  currentStock: z.coerce.number().int(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
})

export type StockType = z.infer<typeof StockSchema>