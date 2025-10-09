import z from "zod";
import { CategorySchema } from "../category/category.schema";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(255).optional(),
  categoryId: z.coerce.number(),
  category: CategorySchema.optional(),
  currentStock: z.coerce.number(),
  expirationDate: z.date().optional(),
  locationId: z.coerce.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date(),
})

export type ProductType = z.infer<typeof ProductSchema>