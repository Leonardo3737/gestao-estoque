import { z } from "zod";
import { isValidCPF } from "../../utils/validate-cpf";
import { UserRoleSchema } from "../user-role/user-role.schema";

export const UserSchema = z.object({
  id: z.coerce.number(),
  name: z.string().min(2).max(100),
  phone: z.string().refine(value => !(
    isNaN(Number(value)) ||
    value.length > 11 ||
    value.length < 10
  ), { message: 'Invalid phone number' }),
  register: z.string().refine(isValidCPF, { message: 'Invalid CPF.' }),
  password: z.string().min(6).max(100),
  roles: z.lazy(() => z.array(UserRoleSchema)).optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
})

export type UserType = z.infer<typeof UserSchema>