import { useState, useEffect, useCallback } from "react";
import { Review } from "@/types";

export function useReviews(limit?: number) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (limit) params.append("limit", limit.toString());

      const response = await fetch(`/api/reviews?${params}`);
      if (!response.ok) throw new Error("Failed to fetch reviews");

      const data = await response.json();
      setReviews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const refetch = () => {
    setError(null);
    fetchReviews();
  };

  return { reviews, loading, error, refetch };
}
