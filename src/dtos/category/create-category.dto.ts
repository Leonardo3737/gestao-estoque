import z from "zod";
import { CategorySchema } from "./category.schema";
import { DTO } from "../dto";

export const CreateCategorySchema = CategorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true
})

export type CreateCategoryType = z.infer<typeof CreateCategorySchema>

export class CreateCategoryDTO extends DTO<typeof CreateCategorySchema> {
  protected rules() {
    return CreateCategorySchema
  }
}