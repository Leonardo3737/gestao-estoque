import { z } from 'zod';
import { AisleSchema } from '../aisle/aisle.schema';
import { ListStockByLocationSchema } from '../stock/list-stock.dto';
import { TransactionLocationSchema } from '../transaction-location/transaction-location.schema';

export const LocationSchema = z.object({
  id: z.coerce.number(),
  aisleId: z.coerce.number(),
  aisle: AisleSchema.optional().nullable(),
  shelf: z.string().min(1).max(40),
  side: z.string().min(1).max(40),
  transactionLocations: z.lazy(() => z.array(TransactionLocationSchema)).optional().nullable(),
  get stock() {
    return z.array(ListStockByLocationSchema).optional()
  },
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
})

export type LocationType = z.infer<typeof LocationSchema>