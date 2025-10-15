import z from "zod";
import { DTO } from "../dto";
import { CreateTransactionLocationByTransactionSchema } from '../transaction-location/create-transaction-location.dto';
import { TransactionSchema } from "./transaction.schema";

export const CreateTransactionSchema = TransactionSchema.omit({
  id: true,
  user: true,
  product: true,
  transactionLocations: true,
  totalQuantity: true,
  warehouse: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
}).extend({
  createTransactionLocations: CreateTransactionLocationByTransactionSchema,
  totalQuantity: z.coerce.number().optional().nullable()
})

export type CreateTransactionType = z.infer<typeof CreateTransactionSchema>

export class CreateTransactionDTO extends DTO<typeof CreateTransactionSchema> {
  protected rules() {
    return CreateTransactionSchema
  }
}