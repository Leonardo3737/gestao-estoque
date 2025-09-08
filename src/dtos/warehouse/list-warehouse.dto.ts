import z from "zod";
import { WarehouseSchema } from "./warehouse.schema";
import { DTO } from "../dto";

export const ListWarehouseSchema = WarehouseSchema

export type ListWarehouseType = z.infer<typeof ListWarehouseSchema>

export class ListWarehouseDTO extends DTO<typeof ListWarehouseSchema> {
  protected rules() {
    return ListWarehouseSchema
  }
}