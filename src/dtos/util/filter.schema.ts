import { count } from 'console';
import { z, ZodObject, ZodRawShape } from 'zod';

export const FilterSchema = <DataType extends ZodRawShape>(Schema: ZodObject<DataType>) =>
  Schema.extend({
    page: z.coerce.number().int().default(1),
    perPage: z.coerce.number().int().default(10),
    search: z.string(),
  }).partial()