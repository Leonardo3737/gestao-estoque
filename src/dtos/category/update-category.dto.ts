import z from "zod";
import { DTO } from "../dto";
import { CreateCategorySchema } from "./create-category.dto";

export const UpdateCategorySchema = CreateCategorySchema.partial()

export type UpdateCategoryType = z.infer<typeof UpdateCategorySchema>

export class UpdateCategoryDTO extends DTO<typeof UpdateCategorySchema> {
  protected rules() {
    return UpdateCategorySchema
  }
}