import z from "zod";
import { ProductSchema } from "./product.schema";
import { DTO } from "../dto";

export const CreateProductSchema = ProductSchema.omit({
  id: true,
  category: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  currentStock: true,
})

export type CreateProductType = z.infer<typeof CreateProductSchema>

export class CreateProductDTO extends DTO<typeof CreateProductSchema> {
  protected rules() {
    return CreateProductSchema
  }
}