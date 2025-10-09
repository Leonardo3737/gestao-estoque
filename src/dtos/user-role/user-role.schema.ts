import { z } from 'zod';
import { RolesEnum } from '../../enums/roles.enum';

export const UserRoleSchema = z.object({
  id: z.number(),
  userId: z.coerce.number(),
  role: z.enum(RolesEnum),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date(),
})

export type UserRoleType = z.infer<typeof UserRoleSchema>