import { z } from 'zod';

export const AisleSchema = z.object({
  id: z.number(),
  warehouseId: z.coerce.number(),
  name: z.string().min(1).max(40),
})

export type AisleType = z.infer<typeof AisleSchema>