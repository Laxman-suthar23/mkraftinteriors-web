"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {LoadingSpinner} from "@/components/common/LoadingSpinner";
import { Review } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminReviewViewPage() {
  const params = useParams();
  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(`/api/reviews/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setReview(data);
        }
      } catch (error) {
        console.error("Error fetching review:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchReview();
    }
  }, [params.id]);

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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!review) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Review Not Found</h1>
        <Link href="/admin/reviews">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reviews
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/reviews">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Reviews
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{review.name}</h1>
            <p className="text-muted-foreground">
              Review submitted on {formatDate(review.createdAt)}
            </p>
          </div>
        </div>
        
        <Link href={`/admin/reviews/${review.id}/edit`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Review
          </Button>
        </Link>
      </div>

      {/* Review Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Review Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-lg font-semibold">
                    {review.rating} out of 5 stars
                  </span>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-6">
                  <p className="leading-relaxed whitespace-pre-wrap">
                    "{review.review}"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Review Details Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Review Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="font-medium">Client Name</label>
                  <p className="text-muted-foreground">{review.name}</p>
                </div>
                
                {review.phone && (
                  <div>
                    <label className="font-medium">Phone</label>
                    <p className="text-muted-foreground">{review.phone}</p>
                  </div>
                )}
                
                <div>
                  <label className="font-medium">Rating</label>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({review.rating}/5)
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="font-medium">Submitted</label>
                  <p className="text-muted-foreground">
                    {formatDate(review.createdAt)}
                  </p>
                </div>
                
                <div>
                  <label className="font-medium">Last Updated</label>
                  <p className="text-muted-foreground">
                    {formatDate(review.updatedAt)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
