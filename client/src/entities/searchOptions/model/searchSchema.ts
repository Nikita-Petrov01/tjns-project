import { z } from 'zod';

export const searchSchema = z.object({
  query: z.string(),
  results: z.array(z.object({})),
  suggestions: z.array(z.object({})),
  history: z.array(z.string()),
  loading: z.boolean(),
  error: z.string().nullable(),
});
