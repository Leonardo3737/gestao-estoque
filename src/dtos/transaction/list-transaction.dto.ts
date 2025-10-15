import z from "zod";
import { DTO } from "../dto";
import { TransactionSchema } from "./transaction.schema";
import { ResponseSchema } from "../util/response.schema";

export const ListTransactionSchema = TransactionSchema

export type ListTransactionType = z.infer<typeof ListTransactionSchema>

export class ListTransactionDTO extends DTO<typeof ListTransactionSchema> {
  protected rules() {
    return ListTransactionSchema
  }
}

export const ListTransactionsSchema = ResponseSchema(TransactionSchema)

export type ListTransactionsType = z.infer<typeof ListTransactionsSchema>

export class ListTransactionsDTO extends DTO<typeof ListTransactionsSchema> {
  protected rules() {
    return ListTransactionsSchema
  }
}