import z from "zod";
import { DTO } from "../dto";
import { TransactionLocationSchema } from "./transaction-location.schema";
import { CreateLocationSchema } from "../location/create-location.dto";

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

export const CreateTransactionLocationByTransactionSchema = z.array(
  CreateTransactionLocationSchema.omit({
    transactionId: true,
    locationId: true
  }).extend({
    locationId: z.coerce.number().optional().nullable(),
    location: CreateLocationSchema.optional().nullable(),
  }).refine(data => {
    if (!data.location && !data.locationId) {
      return false;
    }
    return true;
  }, {
    message: "Either 'locationId' or 'location' must be provided."
  })
).min(1)

export type CreateTransactionLocationByTransactionType = z.infer<typeof CreateTransactionLocationByTransactionSchema>