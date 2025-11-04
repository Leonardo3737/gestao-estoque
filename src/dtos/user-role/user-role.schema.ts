import { z } from 'zod';
import { RolesEnum } from '../../enums/roles.enum';

export const UserRoleSchema = z.object({
  id: z.coerce.number(),
  userId: z.coerce.number(),
  role: z.enum(RolesEnum),
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
})

export type UserRoleType = z.infer<typeof UserRoleSchema>