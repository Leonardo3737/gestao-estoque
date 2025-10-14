import z from "zod";
import { DTO } from "../dto";
import { ProductSchema } from "./product.schema";

export const ListProductSchema = ProductSchema

export type ListProductType = z.infer<typeof ListProductSchema>

export class ListProductDTO extends DTO<typeof ListProductSchema> {
  protected rules() {
    return ListProductSchema
  }
}