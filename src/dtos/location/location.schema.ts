import { z } from 'zod';
import { ProductSchema } from '../product/product.schema';
import { AisleSchema } from '../aisle/aisle.schema';
import { TransactionLocationSchema } from '../transaction-location/transaction-location.schema';

export const LocationSchema = z.object({
  id: z.number(),
  aisleId: z.coerce.number(),
  aisle: AisleSchema.optional(),
  shelf: z.string().min(1).max(40),
  side: z.string().min(1).max(40),
  transactionLocations: z.lazy(() => z.array(TransactionLocationSchema)).optional(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
})

export type LocationType = z.infer<typeof LocationSchema>