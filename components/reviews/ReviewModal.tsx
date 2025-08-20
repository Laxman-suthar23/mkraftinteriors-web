"use client";

import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Review } from "@/types";
import { formatDate } from "@/lib/utils";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: Review | null;
}

export default function ReviewModal({ isOpen, onClose, review }: ReviewModalProps) {
  if (!review) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Review Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">{review.name}</h3>
              {review.project && (
                <p className="text-muted-foreground">{review.project}</p>
              )}
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                {renderStars(review.rating)}
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDate(review.createdAt)}
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-medium mb-3">Review</h4>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="leading-relaxed whitespace-pre-wrap">
                "{review.review}"
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
