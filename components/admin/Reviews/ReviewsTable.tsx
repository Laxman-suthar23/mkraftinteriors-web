"use client";

import Link from "next/link";
import { Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Review } from "@/types";
import { formatDate } from "@/lib/utils";
import ReviewActions from "./ReviewActions";

interface ReviewsTableProps {
  reviews: Review[];
  onUpdate: () => void;
}

export default function ReviewsTable({ reviews, onUpdate }: ReviewsTableProps) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-muted-foreground">({rating})</span>
      </div>
    );
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-semibold mb-2">No reviews found</h3>
        <p className="text-muted-foreground mb-4">
          Reviews will appear here when submitted by clients.
        </p>
        <Link href="/admin/reviews/new">
          <Button>Add Review</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Review</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell>
                <Link 
                  href={`/admin/reviews/${review.id}`}
                  className="font-medium hover:text-primary transition-colors"
                >
                  {review.name}
                </Link>
              </TableCell>
              <TableCell>
                {renderStars(review.rating)}
              </TableCell>
              <TableCell className="text-sm">
                {review.project || (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell>
                <p className="text-sm line-clamp-2 max-w-xs">
                  {review.review}
                </p>
              </TableCell>
              <TableCell>
                <Badge variant={review.published ? "default" : "secondary"}>
                  {review.published ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDate(review.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  <Link href={`/admin/reviews/${review.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <ReviewActions review={review} onUpdate={onUpdate} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
