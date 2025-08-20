"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Review } from "@/types";
export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 0,
    review: "",
    projectId: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to submit review");

      await fetchReviews();
      setForm({ name: "", email: "", rating: 0, review: "", projectId: "" });
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, clickable = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 cursor-pointer ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
        onClick={() => clickable && setForm({ ...form, rating: i + 1 })}
      />
    ));
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-20">
          <div className="container py-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="bg-muted/30 py-16">
          <div className="container text-center">
            <h1 className="heading-1 mb-6">Client Reviews</h1>
            <p className="body-large mb-8">
              Discover what our clients have to say about their experience with Karni Interiors.
            </p>
            {reviews.length > 0 && (
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {renderStars(Math.round(averageRating))}
                </div>
                <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
                <span className="text-muted-foreground">
                  ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
                </span>
              </div>
            )}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="lg">
                  <Plus className="mr-2 h-4 w-4" /> Add Review
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Your Experience</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                  <Input
                    placeholder="Your Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                  <div>
                    <label className="block mb-1">Your Rating</label>
                    <div className="flex space-x-1">{renderStars(form.rating, true)}</div>
                  </div>
                  <Textarea
                    placeholder="Write your review..."
                    value={form.review}
                    onChange={(e) => setForm({ ...form, review: e.target.value })}
                    required
                  />
                  <Button type="submit" disabled={submitting} className="w-full">
                    {submitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="section-padding">
          <div className="container">
            {reviews.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
                <p className="text-muted-foreground">Be the first to share your experience with us.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex space-x-1">{renderStars(review.rating)}</div>
                          <Quote className="h-6 w-6 text-primary/30" />
                        </div>
                        <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-4">
                          "{review.review}"
                        </p>
                        <div className="border-t pt-4">
                          <div className="font-semibold">{review.name}</div>
                          {review.project && (
                            <div className="text-sm text-muted-foreground">{review.project}</div>
                          )}
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
