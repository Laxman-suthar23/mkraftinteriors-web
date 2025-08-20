"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import StarRating from "@/components/reviews/StarRating";
import { ReviewSchema, type ReviewFormData } from "@/lib/validations/review";
import { Review } from "@/types";

interface ReviewFormProps {
  review?: Review;
  onSubmit: (data: ReviewFormData & { published?: boolean }) => Promise<void>;
  onCancel: () => void;
}

export default function ReviewForm({ review, onSubmit, onCancel }: ReviewFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [rating, setRating] = useState(review?.rating || 5);
  const [published, setPublished] = useState(review?.published || false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: review ? {
      name: review.name,
      rating: review.rating,
      review: review.review,
      project: review.project || "",
    } : {
      rating: 5,
    },
  });

  const handleFormSubmit = async (data: ReviewFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await onSubmit({ ...data, rating, published });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {submitError && (
        <Alert variant="destructive">
          <AlertDescription>{submitError}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Review Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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
              <Label htmlFor="project">Project Name</Label>
              <Input
                id="project"
                {...register("project")}
                placeholder="Living Room Renovation"
                disabled={isSubmitting}
              />
            </div>
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

          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={published}
              onCheckedChange={setPublished}
              disabled={isSubmitting}
            />
            <Label htmlFor="published">Published</Label>
            <span className="text-sm text-muted-foreground ml-2">
              {published ? "Visible on website" : "Hidden from website"}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? `${review ? "Updating" : "Creating"}...`
            : `${review ? "Update" : "Create"} Review`
          }
        </Button>
      </div>
    </form>
  );
}
