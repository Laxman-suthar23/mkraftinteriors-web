import { z } from "zod";

export interface Review {
  id: string;
  name: string;
  email: string; // New email field
  rating: number;
  review: string;
  project?: string | null; // nullable here
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Zod validation schema for review form
export const ReviewSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"), // Email validation
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
  review: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Review must be less than 1000 characters"),
  project: z.string().optional(),
});

export type ReviewFormData = z.infer<typeof ReviewSchema>;

export interface CreateReviewData extends ReviewFormData {
  published?: boolean;
}

export interface UpdateReviewData extends Partial<ReviewFormData> {
  published?: boolean;
}

export interface ReviewQueryParams {
  published?: boolean;
  rating?: number;
  limit?: number;
  offset?: number;
  search?: string;
}

export interface ReviewStats {
  total: number;
  published: number;
  averageRating: number;
  ratingDistribution: { [key: number]: number };
}

export interface ReviewFilters {
  rating?: number;
  published?: boolean;
  search?: string;
  sortBy?: "createdAt" | "rating" | "name";
  sortOrder?: "asc" | "desc";
}

export interface PaginatedReviews {
  reviews: Review[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
