import z from 'zod';
import { RolesEnum } from '../../enums/roles.enum';

export const RolesSchema = z.object({
  id: z.number(),
  role: z.enum(RolesEnum),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type RolesType = z.infer<typeof RolesSchema>