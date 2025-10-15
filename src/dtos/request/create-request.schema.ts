import z from "zod";
import { RequestSchema } from "./request.schema";

export const CreateRequestSchema = RequestSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
})


export type CreateRequestType = z.infer<typeof CreateRequestSchema>;
