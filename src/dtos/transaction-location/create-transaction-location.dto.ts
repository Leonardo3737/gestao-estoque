import z from "zod";
import { TransactionLocationSchema } from "./transaction-location.schema";
import { DTO } from "../dto";

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