// lib/services/reviewService.ts

import { Review } from "@/types/review";

export async function getFeaturedReviews(limit?: number): Promise<Review[]> {
  const params = new URLSearchParams();

  if (limit) params.append("limit", limit.toString());

  const res = await fetch(`/api/reviews/featured?${params.toString()}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch featured reviews");
  }

  return res.json();
}
