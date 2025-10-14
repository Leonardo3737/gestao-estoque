import z from "zod";
import { DTO } from "../dto";
import { TransactionSchema } from "./transaction.schema";

export const FilterTransactionSchema = TransactionSchema.partial()

export type FilterTransactionType = z.infer<typeof FilterTransactionSchema>

export class FilterTransactionDTO extends DTO<typeof FilterTransactionSchema> {
  protected rules() {
    return FilterTransactionSchema
  }
}