import z from "zod";
import { DTO } from "../dto";
import { TransactionSchema } from "./transaction.schema";
import { FilterSchema } from "../util/filter.schema";

export const FilterTransactionSchema = FilterSchema(TransactionSchema)

export type FilterTransactionType = z.infer<typeof FilterTransactionSchema>

export class FilterTransactionDTO extends DTO<typeof FilterTransactionSchema> {
  protected rules() {
    return FilterTransactionSchema
  }
}