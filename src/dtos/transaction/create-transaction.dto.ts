import z from "zod";
import { TransactionSchema } from "./transaction.schema";
import { DTO } from "../dto";

export const CreateTransactionSchema = TransactionSchema.omit({
  id: true,
  user: true,
  product: true,
  transactionLocations: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
})

export type CreateTransactionType = z.infer<typeof CreateTransactionSchema>

export class CreateTransactionDTO extends DTO<typeof CreateTransactionSchema> {
  protected rules() {
    return CreateTransactionSchema
  }
}