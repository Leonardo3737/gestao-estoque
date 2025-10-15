import z from "zod";
import { CategorySchema } from "./category.schema";
import { DTO } from "../dto";
import { FilterSchema } from "../util/filter.schema";

export const FilterCategorySchema = FilterSchema(CategorySchema)

export type FilterCategoryType = z.infer<typeof FilterCategorySchema>

export class FilterCategoryDTO extends DTO<typeof FilterCategorySchema> {
  protected rules() {
    return FilterCategorySchema
  }
}