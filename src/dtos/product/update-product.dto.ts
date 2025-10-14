import z from "zod";
import { DTO } from "../dto";
import { CreateProductSchema } from "./create-product.dto";

export const UpdateProductSchema = CreateProductSchema.partial()

export type UpdateProductType = z.infer<typeof UpdateProductSchema>

export class UpdateProductDTO extends DTO<typeof UpdateProductSchema> {
  protected rules() {
    return UpdateProductSchema
  }
}