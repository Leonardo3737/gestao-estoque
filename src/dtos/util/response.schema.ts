import { count } from 'console';
import { z, ZodObject, ZodRawShape } from 'zod';

export const ResponseSchema = <DataType extends ZodRawShape>(Schema: ZodObject<DataType>) =>
  z.object({
    data: z.array(Schema),
    meta: z.object({
      page: z.coerce.number(),
      count: z.coerce.number(),
      perPage: z.coerce.number(),
      hasMore: z.boolean(),
      lastPage: z.coerce.number(),
      from: z.coerce.number(),
      to: z.coerce.number(),
    })
  })