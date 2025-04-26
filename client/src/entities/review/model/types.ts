import type { z } from 'zod';
import type { newReviewSchema, reviewSchema } from './schema';

export type ReviewT = z.infer<typeof reviewSchema>;

export type ReviewSliceT = {
  reviews: ReviewT[];
  loading: boolean;
  review: ReviewT | null;
  reviewsByProduct: ReviewT[];
  sortBy: keyof ReviewT;
  sortOrder: 1 | -1;
};

export type NewReviewT = z.infer<typeof newReviewSchema>;
