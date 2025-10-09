import z from "zod";
import { DTO } from "../dto";
import { TransactionLocationSchema } from "./transaction-location.schema";

export const ListTransactionLocationSchema = TransactionLocationSchema

export type ListTransactionLocationType = z.infer<typeof ListTransactionLocationSchema>

export class ListTransactionLocationDTO extends DTO<typeof ListTransactionLocationSchema> {
  protected rules() {
    return ListTransactionLocationSchema
  }
}