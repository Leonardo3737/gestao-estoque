import z from "zod";
import { DTO } from "../dto";
import { CreateTransactionSchema } from "./create-transaction.dto";

export const UpdateTransactionSchema = CreateTransactionSchema.partial()

export type UpdateTransactionType = z.infer<typeof UpdateTransactionSchema>

export class UpdateTransactionDTO extends DTO<typeof UpdateTransactionSchema> {
  protected rules() {
    return UpdateTransactionSchema
  }
}