import type { z } from 'zod';
import type { categorySchema } from '../../../entities/category/model/categorySchema';

export type CategoryT = z.infer<typeof categorySchema>;

export type SearchSliceT = {
  query: string;
  results: CategoryT[];
  suggestions: CategoryT[];
  history: string[];
  loading: boolean;
  error: string | null;
};
