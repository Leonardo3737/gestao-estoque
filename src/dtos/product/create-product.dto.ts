import z from "zod";
import { DTO } from "../dto";
import { ProductSchema } from "./product.schema";

export const CreateProductSchema = ProductSchema.omit({
  id: true,
  category: true,
  stock: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
})

export type CreateProductType = z.infer<typeof CreateProductSchema>

export class CreateProductDTO extends DTO<typeof CreateProductSchema> {
  protected rules() {
    return CreateProductSchema
  }
}