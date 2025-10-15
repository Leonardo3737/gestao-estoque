import z from "zod";
import { TransactionTypeEnum } from "../../enums/transaction-type.enum";
import { ProductSchema } from "../product/product.schema";
import { ListTransactionLocationByTransactionSchema } from "../transaction-location/transaction-location.schema";
import { ListUserSchema } from "../user/list-user.dto";
import { WarehouseSchema } from "../warehouse/warehouse.schema";

export const TransactionSchema = z.object({
  id: z.number(),
  productId: z.coerce.number(),
  product: ProductSchema.optional(),
  totalQuantity: z.coerce.number(),
  userId: z.coerce.number(),
  user: ListUserSchema.optional(),
  get transactionLocations() {
    return z.array(ListTransactionLocationByTransactionSchema).optional().nullable()
  },
  warehouseId: z.coerce.number(),
  get warehouse() {
    return WarehouseSchema.optional().nullable()
  },
  date: z.coerce.date(),
  type: z.enum(TransactionTypeEnum),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullable(),
  deletedAt: z.coerce.date().nullable(),
})

// cancelled_by_inventory_id

export type TransactionType = z.infer<typeof TransactionSchema>