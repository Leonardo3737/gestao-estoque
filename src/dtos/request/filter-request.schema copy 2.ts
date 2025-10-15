import z from "zod";
import { FilterSchema } from "../util/filter.schema";
import { RequestSchema } from "./request.schema";
import { DTO } from "../dto";


export const FilterRequestSchema = FilterSchema(RequestSchema)

export type FilterRequestType = z.infer<typeof FilterRequestSchema>;

export class FilterRequestDTO extends DTO<typeof FilterRequestSchema> {
  protected rules() {
    return FilterRequestSchema
  }
}
