import z from "zod";
import { WarehouseSchema } from "./warehouse.schema";
import { DTO } from "../dto";
import { ResponseSchema } from "../util/response.schema";

export const ListWarehouseSchema = WarehouseSchema

export type ListWarehouseType = z.infer<typeof ListWarehouseSchema>

export class ListWarehouseDTO extends DTO<typeof ListWarehouseSchema> {
  protected rules() {
    return ListWarehouseSchema
  }
}

export const ListWarehousesSchema = ResponseSchema(WarehouseSchema)

export type ListWarehousesType = z.infer<typeof ListWarehousesSchema>

export class ListWarehousesDTO extends DTO<typeof ListWarehousesSchema> {
  protected rules() {
    return ListWarehousesSchema
  }
}