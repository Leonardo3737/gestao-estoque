import { z } from 'zod';
import { ProductSchema } from '../product/product.schema';

export const LocationSchema = z.object({
  id: z.number(),
  aisleId: z.coerce.number(),
  shelf: z.string().min(1).max(40),
  side: z.string().min(1).max(40),
  products: z.lazy(() => z.array(ProductSchema)).optional(),
})

export type LocationType = z.infer<typeof LocationSchema>