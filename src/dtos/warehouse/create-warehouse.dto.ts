import z from "zod";
import { WarehouseSchema } from "./warehouse.schema";
import { DTO } from "../dto";

export const CreateWarehouseSchema = WarehouseSchema.omit({
  id: true
})

export type CreateWarehouseType = z.infer<typeof CreateWarehouseSchema>

export class CreateWarehouseDTO extends DTO<typeof CreateWarehouseSchema> {
  protected rules() {
    return CreateWarehouseSchema
  }
}