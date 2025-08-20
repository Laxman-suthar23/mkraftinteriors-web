"use client";

import { motion } from "framer-motion";
import ReviewCard from "./ReviewCard";
// In ReviewsGrid.tsx and your page
import { Review } from "@/types"; // always from the unified entry


interface ReviewsGridProps {
  reviews: Review[];
  loading?: boolean;
}

export default function ReviewsGrid({ reviews, loading }: ReviewsGridProps) {
  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-64 bg-muted rounded p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="w-4 h-4 bg-muted-foreground/20 rounded" />
                  ))}
                </div>
                <div className="w-6 h-6 bg-muted-foreground/20 rounded" />
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="h-3 bg-muted-foreground/20 rounded w-full" />
                <div className="h-3 bg-muted-foreground/20 rounded w-5/6" />
                <div className="h-3 bg-muted-foreground/20 rounded w-4/5" />
              </div>
              
              <div className="border-t pt-4">
                <div className="h-4 bg-muted-foreground/20 rounded w-32 mb-1" />
                <div className="h-3 bg-muted-foreground/20 rounded w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
        <p className="text-muted-foreground">
          Be the first to share your experience with us.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <ReviewCard review={review} />
        </motion.div>
      ))}
    </motion.div>
  );
}
