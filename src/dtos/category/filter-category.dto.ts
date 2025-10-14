import z from "zod";
import { CategorySchema } from "./category.schema";
import { DTO } from "../dto";

export const FilterCategorySchema = CategorySchema.partial()

export type FilterCategoryType = z.infer<typeof FilterCategorySchema>

export class FilterCategoryDTO extends DTO<typeof FilterCategorySchema> {
  protected rules() {
    return FilterCategorySchema
  }
}