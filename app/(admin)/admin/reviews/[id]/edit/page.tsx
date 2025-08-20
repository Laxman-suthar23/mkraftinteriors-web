"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReviewEditor from "@/components/admin/Reviews/ReviewEditor";
import {LoadingSpinner} from "@/components/common/LoadingSpinner";
import { Review } from "@/types";

export default function EditReviewPage() {
  const params = useParams();
  const router = useRouter();
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

  const handleSuccess = () => {
    router.push("/admin/reviews");
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
      <div className="flex items-center space-x-4">
        <Link href="/admin/reviews">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reviews
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Review</h1>
          <p className="text-muted-foreground">Update review information</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Review Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ReviewEditor 
            review={review}
            onSuccess={handleSuccess}
          />
        </CardContent>
      </Card>
    </div>
  );
}
