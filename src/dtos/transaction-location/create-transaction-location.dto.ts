import z from "zod";
import { DTO } from "../dto";
import { TransactionLocationSchema } from "./transaction-location.schema";

export const CreateTransactionLocationSchema = TransactionLocationSchema.omit({
  id: true,
  transaction: true,
  location: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
})

export type CreateTransactionLocationType = z.infer<typeof CreateTransactionLocationSchema>

export class CreateTransactionLocationDTO extends DTO<typeof CreateTransactionLocationSchema> {
  protected rules() {
    return CreateTransactionLocationSchema
  }
}

export const CreateTransactionLocationByTransactionSchema = z.array(CreateTransactionLocationSchema.omit({
  transactionId: true
})).min(1)

export type CreateTransactionLocationByTransactionType = z.infer<typeof CreateTransactionLocationByTransactionSchema>