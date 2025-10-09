import z from "zod";
import { DTO } from "../dto";
import { AisleSchema } from "./aisle.schema";

export const CreateAisleSchema = AisleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
})

export type CreateAisleType = z.infer<typeof CreateAisleSchema>

export class CreateAisleDTO extends DTO<typeof CreateAisleSchema> {
  protected rules() {
    return CreateAisleSchema
  }
}