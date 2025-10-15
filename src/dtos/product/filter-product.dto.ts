import z from "zod";
import { DTO } from "../dto";
import { ProductSchema } from "./product.schema";
import { FilterSchema } from "../util/filter.schema";

export const FilterProductSchema = FilterSchema(ProductSchema)

export type FilterProductType = z.infer<typeof FilterProductSchema>

export class FilterProductDTO extends DTO<typeof FilterProductSchema> {
  protected rules() {
    return FilterProductSchema
  }
}