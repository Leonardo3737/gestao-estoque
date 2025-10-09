import { z } from "zod";
import { DTO } from "../dto";
import { UserSchema } from "./user.schema";

export const AdminListUserSchema = UserSchema.omit({
  password: true
})

export type AdminListUserType = z.infer<typeof AdminListUserSchema>

export class AdminListUserDTO extends DTO<typeof AdminListUserSchema> {
  protected rules() {
    return AdminListUserSchema
  }
}