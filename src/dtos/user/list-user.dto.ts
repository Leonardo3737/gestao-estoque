import { z } from "zod";
import { DTO } from "../dto";
import { UserSchema } from "./user.schema";
import { ResponseSchema } from "../util/response.schema";

export const ListUserSchema = UserSchema.omit({
  password: true,
  phone: true,
  register: true,
})

export type ListUserType = z.infer<typeof ListUserSchema>

export class ListUserDTO extends DTO<typeof ListUserSchema> {
  protected rules() {
    return ListUserSchema
  }
}

export const ListUserByAdminSchema = UserSchema.omit({
  password: true
})

export type ListUserByAdminType = z.infer<typeof ListUserByAdminSchema>

export class ListUserByAdminDTO extends DTO<typeof ListUserByAdminSchema> {
  protected rules() {
    return ListUserByAdminSchema
  }
}

export const ListUsersByAdminSchema = ResponseSchema(ListUserByAdminSchema)

export type ListUsersByAdminType = z.infer<typeof ListUsersByAdminSchema>

export class ListUsersByAdminDTO extends DTO<typeof ListUsersByAdminSchema> {
  protected rules() {
    return ListUsersByAdminSchema
  }
}