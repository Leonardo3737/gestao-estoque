import { z } from 'zod';
import { WarehouseSchema } from '../warehouse/warehouse.schema';

export const AisleSchema = z.object({
  id: z.number(),
  warehouseId: z.coerce.number(),
  warehouse: WarehouseSchema.optional(),
  name: z.string().min(1).max(40),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
})

export type AisleType = z.infer<typeof AisleSchema>