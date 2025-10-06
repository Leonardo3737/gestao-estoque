import z from "zod";
import { CategorySchema } from "../category/category.schema";
import { LocationSchema } from "../location/location.schema";
import { ProductSchema } from "../product/product.schema";
import { UserSchema } from "../user/user.schema";
import { ListUserSchema } from "../user/list-user.dto";
import { TransactionTypeEnum } from "../../enums/transaction-type.enum";

export const TransactionSchema = z.object({
  id: z.number(),
  productId: z.coerce.number(),
  product: ProductSchema.optional(),
  userId: z.coerce.number(),
  user: ListUserSchema.optional(),
  date: z.coerce.date(),
  quantity: z.number(),
  type: z.enum(TransactionTypeEnum),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date(),
})

export type TransactionType = z.infer<typeof TransactionSchema>