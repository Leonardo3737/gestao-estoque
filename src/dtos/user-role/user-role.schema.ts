import { z } from 'zod';
import { RolesEnum } from '../../enums/roles.enum';
import { UserSchema } from '../user/user.schema';

export const UserRoleSchema = z.object({
  id: z.number(),
  userId: z.coerce.number(),
  role: z.enum(RolesEnum),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type UserRoleType = z.infer<typeof UserRoleSchema>