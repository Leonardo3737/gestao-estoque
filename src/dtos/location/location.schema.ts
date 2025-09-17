import { z } from 'zod';

export const LocationSchema = z.object({
  id: z.number(),
  aisleId: z.coerce.number(),
  shelf: z.string().min(1).max(40),
  side:z.string().min(1).max(40),
})

export type LocationType = z.infer<typeof LocationSchema>