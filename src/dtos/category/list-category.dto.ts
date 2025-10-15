import z from "zod";
import { CategorySchema } from "./category.schema";
import { DTO } from "../dto";
import { ResponseSchema } from "../util/response.schema";

export const ListCategorySchema = CategorySchema

export type ListCategoryType = z.infer<typeof ListCategorySchema>

export class ListCategoryDTO extends DTO<typeof ListCategorySchema> {
  protected rules() {
    return ListCategorySchema
  }
}

export const ListCategoriesSchema = ResponseSchema(CategorySchema)

export type ListCategoriesType = z.infer<typeof ListCategoriesSchema>

export class ListCategoriesDTO extends DTO<typeof ListCategoriesSchema> {
  protected rules() {
    return ListCategoriesSchema
  }
}