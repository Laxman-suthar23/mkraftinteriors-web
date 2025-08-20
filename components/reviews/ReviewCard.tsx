import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Review } from "@/types";
import { formatDate, cn } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
  showProject?: boolean;
  className?: string;
}

export default function ReviewCard({ 
  review, 
  showProject = true, 
  className 
}: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < rating 
            ? "fill-yellow-400 text-yellow-400" 
            : "fill-muted text-muted-foreground"
        )}
      />
    ));
  };

  return (
    <Card className={cn("h-full", className)} data-testid="review-card">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Rating */}
          <div className="flex items-center space-x-1">
            {renderStars(review.rating)}
            <span className="ml-2 text-sm text-muted-foreground">
              ({review.rating}/5)
            </span>
          </div>

          {/* Review Text */}
          <blockquote className="text-muted-foreground leading-relaxed">
            "{review.review}"
          </blockquote>

          {/* Author and Project */}
          <div className="space-y-2">
            <div className="font-semibold text-foreground">
              {review.name}
            </div>
            
            {showProject && review.project && (
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {review.project}
                </Badge>
              </div>
            )}
            
            <div className="text-xs text-muted-foreground">
              {formatDate(review.createdAt)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
