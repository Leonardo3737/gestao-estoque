import z from "zod";
import { DTO } from "../dto";
import { ProductSchema } from "./product.schema";

export const FilterProductSchema = ProductSchema.partial()

export type FilterProductType = z.infer<typeof FilterProductSchema>

export class FilterProductDTO extends DTO<typeof FilterProductSchema> {
  protected rules() {
    return FilterProductSchema
  }
}