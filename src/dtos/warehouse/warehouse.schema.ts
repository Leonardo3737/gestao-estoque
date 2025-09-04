import z from "zod";

export const WarehouseSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(40),
  address: z.string().min(3).max(100),
})

export type WarehouseType = z.infer<typeof WarehouseSchema>