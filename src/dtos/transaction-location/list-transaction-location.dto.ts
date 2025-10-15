import z from "zod";
import { DTO } from "../dto";
import { TransactionLocationSchema } from "./transaction-location.schema";
import { ResponseSchema } from "../util/response.schema";

export const ListTransactionLocationSchema = TransactionLocationSchema

export type ListTransactionLocationType = z.infer<typeof ListTransactionLocationSchema>

export class ListTransactionLocationDTO extends DTO<typeof ListTransactionLocationSchema> {
  protected rules() {
    return ListTransactionLocationSchema
  }
}

export const ListTransactionLocationsSchema = ResponseSchema(TransactionLocationSchema)

export type ListTransactionLocationsType = z.infer<typeof ListTransactionLocationsSchema>

export class ListTransactionsLocationDTO extends DTO<typeof ListTransactionLocationsSchema> {
  protected rules() {
    return ListTransactionLocationsSchema
  }
}