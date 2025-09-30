"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Star, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import Link from "next/link";
import { Review } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    let filtered = reviews;

    if (searchTerm) {
      filtered = filtered.filter(
        (review) =>
          review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.review.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (review.project && review.project.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredReviews(filtered);
  }, [reviews, searchTerm]);

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      const data = await response.json();
      setReviews(data);
      setFilteredReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (id: string) => {
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setReviews(reviews.filter((r) => r.id !== id));
        setDeleteDialogOpen(false);
        setReviewToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded w-64 animate-pulse" />
        <div className="h-96 bg-muted rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reviews</h1>
          <p className="text-muted-foreground">
            Manage client reviews and testimonials
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/reviews/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Review
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 max-w-md"
            />
          </div>
        </CardContent>
      </Card>

      {/* Reviews Table */}
      <Card>
        <CardContent className="p-0">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-lg font-semibold mb-2">No reviews found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm
                  ? "Try adjusting your search terms."
                  : "Get started by adding your first review."}
              </p>
              <Button asChild>
                <Link href="/admin/reviews/new">Add Review</Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.map((review, index) => (
                  <motion.tr
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group"
                  >
                    <TableCell>
                      <div className="font-medium">{review.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {review.phone || (
                        <span className="text-muted-foreground">No Phone</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="line-clamp-2 text-sm">{review.review}</p>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(review.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedReview(review);
                            setDetailsDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/reviews/${review.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setReviewToDelete(review.id);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      {/* Review Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Client Name
                  </div>
                  <p className="text-lg font-medium">{selectedReview.name}</p>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Rating
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(selectedReview.rating)}
                    <span className="ml-2 text-lg font-medium">
                      {selectedReview.rating}/5
                    </span>
                  </div>
                </div>
                {selectedReview.phone && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Phone
                    </div>
                    <p className="text-lg">{selectedReview.phone}</p>
                  </div>
                )}
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Date
                  </div>
                  <p className="text-lg">{formatDate(selectedReview.createdAt)}</p>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-2">
                  Review
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="whitespace-pre-wrap leading-relaxed">
                    "{selectedReview.review}"
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Review"
        description="Are you sure you want to delete this review? This action cannot be undone."
        onConfirm={() => reviewToDelete && handleDeleteReview(reviewToDelete)}
        destructive
      />
    </div>
  );
}
