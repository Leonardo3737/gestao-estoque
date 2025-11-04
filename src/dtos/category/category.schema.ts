import z from "zod";

export const CategorySchema = z.object({
  id: z.coerce.number(),
  name: z.string().min(1).max(100),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
})

export type CategoryType = z.infer<typeof CategorySchema>