// lib/validations/review.ts
import { z } from "zod";

export const ReviewSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  phone: z.string(),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
  review: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(1000, "Review must be less than 1000 characters"),
  project: z.string().optional().or(z.literal("")),
});

export type ReviewFormData = z.infer<typeof ReviewSchema>;
