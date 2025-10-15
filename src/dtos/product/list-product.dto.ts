import z from "zod";
import { DTO } from "../dto";
import { ProductSchema } from "./product.schema";
import { ResponseSchema } from "../util/response.schema";

export const ListProductSchema =  ProductSchema

export type ListProductType = z.infer<typeof ListProductSchema>

export class ListProductDTO extends DTO<typeof ListProductSchema> {
  protected rules() {
    return ListProductSchema
  }
}

export const ListProductsSchema = ResponseSchema(ProductSchema)

export type ListProductsType = z.infer<typeof ListProductsSchema>

export class ListProductsDTO extends DTO<typeof ListProductsSchema> {
  protected rules() {
    return ListProductsSchema
  }
}