"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Plus, Award, Users, ThumbsUp, MessageSquare, Send, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Review } from "@/types";
import CallToAction from "@/components/home/CallToAction";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

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

  const handleShowMore = () => {
    setShowAll(true);
  };

  const renderStars = (rating: number, clickable = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${clickable ? "cursor-pointer" : ""} ${
          i < rating ? "text-accent fill-accent" : "text-muted-foreground"
        }`}
        onClick={() => clickable && setForm({ ...form, rating: i + 1 })}
      />
    ));
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  const displayedReviews = showAll ? reviews : reviews.slice(0, 6);
  const featuredReview =
    reviews.find((review) => review.rating === 5) || reviews[0];

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16">
          {/* Hero Section Skeleton */}
          <section
            className="py-20"
            style={{ background: "var(--gradient-hero)" }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-8">
                <div className="bg-white/20 rounded-lg h-16 w-96 mx-auto animate-pulse" />
                <div className="bg-white/10 rounded-lg h-6 w-[800px] max-w-full mx-auto animate-pulse" />
              </div>
            </div>
          </section>

          <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-muted rounded-lg animate-pulse"
                />
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
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <section
          className="py-20"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                Client <span className="text-gradient">Reviews</span>
              </h1>
              <p className="text-xl text-white max-w-4xl mx-auto leading-relaxed">
                Don't just take our word for it. Read what our satisfied clients
                have to say about their experience working with us and see how
                we've transformed their spaces.
              </p>
              {reviews.length > 0 && (
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1">
                    {renderStars(Math.round(averageRating))}
                  </div>
                  <span className="text-2xl font-bold text-white">
                    {averageRating.toFixed(1)}
                  </span>
                  <span className="text-white">
                    ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
                  </span>
                </div>
              )}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground hover:from-accent/90 hover:to-accent/70 shadow-elegant"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Share Your Experience
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg bg-card border-accent/20 shadow-2xl">
                  <DialogHeader className="text-center pb-6">
                    <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                      <Star className="h-8 w-8 text-accent" />
                    </div>
                    <DialogTitle className="text-2xl font-bold text-foreground">
                      Share Your Experience
                    </DialogTitle>
                    <p className="text-muted-foreground">
                      Help others discover our craftsmanship through your review
                    </p>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground flex items-center">
                          <User className="h-4 w-4 mr-2 text-accent" />
                          Your Name
                        </label>
                        <Input
                          placeholder="John Doe"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          className="border-input/50 focus:border-accent transition-colors"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-accent" />
                          Email
                        </label>
                        <Input
                          placeholder="john@example.com"
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          className="border-input/50 focus:border-accent transition-colors"
                          required
                        />
                      </div>
                    </div>

                    {/* Rating Section */}
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-foreground">
                        How would you rate your experience?
                      </label>
                      <div className="flex flex-col items-center space-y-3 p-6 bg-accent/5 rounded-lg border border-accent/10">
                        <div className="flex space-x-2">
                          {renderStars(form.rating, true)}
                        </div>
                        <p className="text-sm text-muted-foreground text-center">
                          {form.rating === 5
                            ? "Outstanding!"
                            : form.rating === 4
                              ? "Great work!"
                              : form.rating === 3
                                ? "Good experience"
                                : form.rating === 2
                                  ? "Could be better"
                                  : form.rating === 1
                                    ? "Needs improvement"
                                    : "Tap stars to rate"}
                        </p>
                      </div>
                    </div>

                    {/* Review Text */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2 text-accent" />
                        Your Review
                      </label>
                      <Textarea
                        placeholder="Tell us about your experience with our craftsmanship, quality, and service..."
                        value={form.review}
                        onChange={(e) =>
                          setForm({ ...form, review: e.target.value })
                        }
                        className="min-h-[120px] border-input/50 focus:border-accent transition-colors resize-none"
                        required
                      />
                      <p className="text-xs text-muted-foreground text-right">
                        {form.review.length}/500 characters
                      </p>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full h-12 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 shadow-lg disabled:opacity-50 font-semibold"
                      >
                        {submitting ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-accent-foreground border-t-transparent mr-2" />
                            Submitting Review...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Send className="mr-2 h-4 w-4" />
                            Submit Review
                          </div>
                        )}
                      </Button>
                    </div>

                    {/* Privacy Note */}
                    <p className="text-xs text-muted-foreground text-center leading-relaxed">
                      Your review will be displayed publicly to help others
                      learn about our work. We respect your privacy and won't
                      share your email address.
                    </p>
                  </form>
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="bg-card rounded-3xl p-8 lg:p-12 shadow-card max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="flex space-x-1">
                        {renderStars(Math.floor(averageRating))}
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-accent mb-2">
                      {averageRating.toFixed(1)}
                    </div>
                    <div className="text-muted-foreground">Average Rating</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-accent" />
                    </div>
                    <div className="text-4xl font-bold text-accent mb-2">
                      {reviews.length}+
                    </div>
                    <div className="text-muted-foreground">Happy Clients</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ThumbsUp className="h-8 w-8 text-accent" />
                    </div>
                    <div className="text-4xl font-bold text-accent mb-2">
                      98%
                    </div>
                    <div className="text-muted-foreground">
                      Satisfaction Rate
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Review */}
        {featuredReview && (
          <section
            className="py-20"
            style={{ background: "var(--gradient-subtle)" }}
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Featured <span className="text-gradient">Review</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-card rounded-3xl p-8 lg:p-12 shadow-card text-center"
              >
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Quote className="h-8 w-8 text-accent" />
                </div>

                <div className="flex justify-center space-x-1 mb-6">
                  {renderStars(featuredReview.rating)}
                </div>

                <blockquote className="text-2xl text-foreground leading-relaxed italic mb-8 max-w-3xl">
                  "{featuredReview.review}"
                </blockquote>

                <div className="flex items-center justify-center">
                  <div>
                    <div className="font-bold text-foreground text-lg">
                      {featuredReview.name}
                    </div>
                    {featuredReview.project && (
                      <div className="text-muted-foreground">
                        {featuredReview.project}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Reviews Grid */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                What Our <span className="text-gradient">Clients Say</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Read authentic reviews from clients who have experienced our
                interior design services and see how we've helped transform
                their spaces and lives.
              </p>
            </motion.div>

            {reviews.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">⭐</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  No reviews yet
                </h3>
                <p className="text-muted-foreground mb-8">
                  Be the first to share your experience with us.
                </p>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button className="btn-primary">
                      <Plus className="mr-2 h-4 w-4" /> Write First Review
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {displayedReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full group overflow-hidden rounded-2xl shadow-card hover-lift bg-card">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex space-x-1">
                            {renderStars(review.rating)}
                          </div>
                          <Quote className="h-6 w-6 text-accent/30" />
                        </div>
                        <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-4">
                          "{review.review}"
                        </p>
                        <div className="border-t pt-4">
                          <div className="font-semibold text-foreground">
                            {review.name}
                          </div>
                          {review.project && (
                            <div className="text-sm text-muted-foreground">
                              {review.project}
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {!showAll && reviews.length > 6 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <Button
                  onClick={handleShowMore}
                  className="btn-primary"
                  size="lg"
                >
                  Load More Reviews
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Trust Indicators */}
        <section
          className="py-20"
          style={{ background: "var(--gradient-subtle)" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Trusted by{" "}
                <span className="text-gradient">{reviews.length}+ Clients</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Award,
                  title: "Award-Winning Design",
                  description:
                    "Recognized for excellence in interior design with multiple industry awards.",
                },
                {
                  icon: Users,
                  title: "Satisfied Clients",
                  description: `Over ${reviews.length} happy clients who love their transformed spaces.`,
                },
                {
                  icon: Star,
                  title: "5-Star Service",
                  description:
                    "Consistently rated 5 stars for quality, professionalism, and results.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-2xl p-8 text-center shadow-card hover-lift"
                >
                  <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <item.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
