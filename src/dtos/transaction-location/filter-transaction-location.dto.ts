import z from "zod";
import { DTO } from "../dto";
import { TransactionLocationSchema } from "./transaction-location.schema";

export const FilterTransactionLocationSchema = TransactionLocationSchema.partial()

export type FilterTransactionLocationType = z.infer<typeof FilterTransactionLocationSchema>

export class FilterTransactionLocationDTO extends DTO<typeof FilterTransactionLocationSchema> {
  protected rules() {
    return FilterTransactionLocationSchema
  }
}