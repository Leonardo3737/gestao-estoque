import z from "zod";
import { DTO } from '../dto';
import { AdminListUserSchema } from '../user/admin-list-user.dto';

export const RequestSchema = z.object({
  id: z.number().optional().nullable(),
  method: z.string().min(1).max(10),
  endpoint: z.string(),
  statusCode: z.number().int(),
  userId: z.number().int().optional().nullable(),
  user: AdminListUserSchema.optional().nullable(),
  body: z.record(z.string(), z.any()).optional().nullable(),
  response: z.record(z.string(), z.any()).optional().nullable(),
  ipAddress: z.string().optional().nullable(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
  deletedAt: z.coerce.date().nullable(),
});

export const CreateRequestSchema = RequestSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
})

export type RequestType = z.infer<typeof RequestSchema>;
export type CreateRequestType = z.infer<typeof CreateRequestSchema>;

export class RequestDTO extends DTO<typeof RequestSchema> {
  protected rules() {
    return RequestSchema
  }
}