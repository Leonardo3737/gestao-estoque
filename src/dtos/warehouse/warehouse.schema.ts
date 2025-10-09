import z from "zod";

export const WarehouseSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(40),
  address: z.string().min(3).max(100),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
})

export type WarehouseType = z.infer<typeof WarehouseSchema>