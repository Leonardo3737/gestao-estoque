import z from "zod";

export const KpiSchema = z.object({
  totalStock: z.coerce.number(),
  totalProduct: z.coerce.number(),
  belowMinimumStock: z.coerce.number(),
  closeToTheExpirationDate: z.coerce.number(),
})

export type KpiType = z.infer<typeof KpiSchema>