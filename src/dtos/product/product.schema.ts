import z from "zod";
import { CategorySchema } from "../category/category.schema";
import { ListStockByProductSchema } from '../stock/list-stock.dto';

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(255).optional(),
  categoryId: z.coerce.number(),
  category: CategorySchema.optional(),
  get stock() {
    return z.array(ListStockByProductSchema).optional()
  },
  currentStock: z.coerce.number(),
  expirationDate: z.date().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
})

export type ProductType = z.infer<typeof ProductSchema>