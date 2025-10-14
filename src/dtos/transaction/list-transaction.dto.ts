import z from "zod";
import { DTO } from "../dto";
import { TransactionSchema } from "./transaction.schema";

export const ListTransactionSchema = TransactionSchema

export type ListTransactionType = z.infer<typeof ListTransactionSchema>

export class ListTransactionDTO extends DTO<typeof ListTransactionSchema> {
  protected rules() {
    return ListTransactionSchema
  }
}