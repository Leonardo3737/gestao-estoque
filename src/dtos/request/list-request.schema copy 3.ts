import z from "zod";
import { DTO } from '../dto';
import { ResponseSchema } from "../util/response.schema";
import { RequestSchema } from "./request.schema";


export const ListRequestSchema = RequestSchema

export type ListRequestType = z.infer<typeof ListRequestSchema>;

export class ListRequestDTO extends DTO<typeof ListRequestSchema> {
  protected rules() {
    return ListRequestSchema
  }
}

export const ListRequestsSchema = ResponseSchema(RequestSchema)

export type ListRequestsType = z.infer<typeof ListRequestsSchema>;

export class ListRequestsDTO extends DTO<typeof ListRequestsSchema> {
  protected rules() {
    return ListRequestsSchema
  }
}
