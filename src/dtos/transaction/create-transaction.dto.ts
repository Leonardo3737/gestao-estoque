import z from "zod";
import { DTO } from "../dto";
import { CreateTransactionLocationSchema } from '../transaction-location/create-transaction-location.dto';
import { TransactionSchema } from "./transaction.schema";

export const CreateTransactionSchema = TransactionSchema.omit({
  id: true,
  user: true,
  product: true,
  transactionLocations: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
}).extend({
  createTransactionLocations: z.array(CreateTransactionLocationSchema.omit({ transactionId: true })).min(1)
})

export type CreateTransactionType = z.infer<typeof CreateTransactionSchema>

export class CreateTransactionDTO extends DTO<typeof CreateTransactionSchema> {
  protected rules() {
    return CreateTransactionSchema
  }
}