import z from "zod";
import { DTO } from "../dto";
import { TransactionLocationSchema } from "./transaction-location.schema";
import { FilterSchema } from "../util/filter.schema";

export const FilterTransactionLocationSchema = FilterSchema(TransactionLocationSchema)

export type FilterTransactionLocationType = z.infer<typeof FilterTransactionLocationSchema>

export class FilterTransactionLocationDTO extends DTO<typeof FilterTransactionLocationSchema> {
  protected rules() {
    return FilterTransactionLocationSchema
  }
}