
import z from "zod";
import { DTO } from "../dto";
import { LocationSchema } from "./location.schema";

export const CreateLocationSchema = LocationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
})

export type CreateLocationType = z.infer<typeof CreateLocationSchema>

export class CreateLocationDTO extends DTO<typeof CreateLocationSchema> {
  protected rules() {
    return CreateLocationSchema
  }
}