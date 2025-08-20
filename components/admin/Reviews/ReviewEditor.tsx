"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import StarRating from "@/components/reviews/StarRating";
import { ReviewSchema, type ReviewFormData } from "@/types/review";
import { Review } from "@/types";

interface ReviewEditorProps {
  review?: Review;
  onSuccess: () => void;
}

export default function ReviewEditor({ review, onSuccess }: ReviewEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [rating, setRating] = useState(review?.rating || 5);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: review
      ? {
          name: review.name,
          email: review.email || "",
          rating: review.rating,
          review: review.review,
          project: review.project || "",
        }
      : {
          rating: 5,
        },
  });

  const onSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const reviewData = { ...data, rating };
      const url = review ? `/api/reviews/${review.id}` : "/api/reviews";
      const method = review ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setTimeout(onSuccess, 1500);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error saving review:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {submitStatus === "success" && (
        <Alert className="bg-green-50 border-green-200">
          <AlertDescription className="text-green-800">
            Review {review ? "updated" : "created"} successfully!
          </AlertDescription>
        </Alert>
      )}

      {submitStatus === "error" && (
        <Alert variant="destructive">
          <AlertDescription>
            There was an error saving the review. Please try again.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Client Name *</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="John Doe"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Client Email *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="john@example.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="project">Project Name</Label>
        <Input
          id="project"
          {...register("project")}
          placeholder="Living Room Renovation"
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label>Rating *</Label>
        <div className="flex items-center space-x-4">
          <StarRating
            rating={rating}
            onRatingChange={setRating}
            size="lg"
            readonly={isSubmitting}
          />
          <span className="text-sm text-muted-foreground">
            {rating} out of 5 stars
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="review">Review Text *</Label>
        <Textarea
          id="review"
          {...register("review")}
          rows={6}
          placeholder="Share the client's experience..."
          disabled={isSubmitting}
        />
        {errors.review && (
          <p className="text-sm text-red-500">{errors.review.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onSuccess}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? `${review ? "Updating" : "Creating"}...`
            : `${review ? "Update" : "Create"} Review`}
        </Button>
      </div>
    </form>
  );
}
