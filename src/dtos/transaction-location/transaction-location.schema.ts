import z from "zod";
import { DTO } from "../dto";
import { LocationSchema } from "../location/location.schema";
import { TransactionSchema } from "../transaction/transaction.schema";

export const TransactionLocationSchema = z.object({
  id: z.number(),
  transactionId: z.coerce.number(),
  get transaction(): z.ZodOptional<z.ZodNullable<typeof TransactionSchema>> {
    return z.nullable(TransactionSchema).optional()
  },
  locationId: z.coerce.number(),
  get location(): z.ZodOptional<z.ZodNullable<typeof LocationSchema>> {
    return z.nullable(LocationSchema).optional()
  },
  quantity: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullable(),
  deletedAt: z.coerce.date().nullable(),
})

export type TransactionLocationType = z.infer<typeof TransactionLocationSchema>


export const TransactionListTransactionLocationSchema = TransactionLocationSchema.omit({
  transaction: true
})

export type TransactionListTransactionLocationType = z.infer<typeof TransactionListTransactionLocationSchema>

export class TransactionListTransactionLocationDTO extends DTO<typeof TransactionListTransactionLocationSchema> {
  protected rules() {
    return TransactionListTransactionLocationSchema
  }
}