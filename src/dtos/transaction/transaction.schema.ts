import z from "zod";
import { ProductSchema, ProductType } from "../product/product.schema";
import { ListUserSchema } from "../user/list-user.dto";
import { TransactionTypeEnum } from "../../enums/transaction-type.enum";
import { TransactionListTransactionLocationSchema } from "../transaction-location/transaction-location.schema";

export const TransactionSchema = z.object({
  id: z.number(),
  productId: z.coerce.number(),
  product: ProductSchema.optional(),
  userId: z.coerce.number(),
  user: ListUserSchema.optional(),
  get transactionLocations() {
    return z.array(TransactionListTransactionLocationSchema).optional().nullable()
  },
  date: z.coerce.date(),
  quantity: z.number(),
  type: z.enum(TransactionTypeEnum),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullable(),
  deletedAt: z.coerce.date().nullable(),
})

export type TransactionType = z.infer<typeof TransactionSchema>