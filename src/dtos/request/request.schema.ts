import z from "zod";
import { DTO } from '../dto';
import { ListUserByAdminSchema } from '../user/list-user.dto';
import { FilterSchema } from "../util/filter.schema";

export const RequestSchema = z.object({
  id: z.coerce.number().optional().nullable(),
  method: z.string().min(1).max(10),
  endpoint: z.string(),
  statusCode: z.coerce.number().int(),
  userId: z.coerce.number().int().optional().nullable(),
  user: ListUserByAdminSchema.optional().nullable(),
  body: z.record(z.string(), z.any()).optional().nullable(),
  response: z.record(z.string(), z.any()).optional().nullable(),
  ipAddress: z.string().optional().nullable(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
  deletedAt: z.coerce.date().nullable(),
});

export type RequestType = z.infer<typeof RequestSchema>;