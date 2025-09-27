"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Plus, Award, Users, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
        className={`h-5 w-5 ${clickable ? 'cursor-pointer' : ''} ${
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
  const featuredReview = reviews.find(review => review.rating === 5) || reviews[0];

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-16">
          {/* Hero Section Skeleton */}
          <section className="py-20" style={{ background: 'var(--gradient-hero)' }}>
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
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="py-20" style={{ background: 'var(--gradient-hero)' }}>
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
                Don't just take our word for it. Read what our satisfied clients have to say about their 
                experience working with us and see how we've transformed their spaces.
              </p>
              {reviews.length > 0 && (
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1">
                    {renderStars(Math.round(averageRating))}
                  </div>
                  <span className="text-2xl font-bold text-white">{averageRating.toFixed(1)}</span>
                  <span className="text-white">
                    ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
                  </span>
                </div>
              )}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
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
                      <label className="block mb-1 text-sm font-medium">Your Rating</label>
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
                    <div className="text-muted-foreground">Satisfaction Rate</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Review */}
        {featuredReview && (
          <section className="py-20" style={{ background: 'var(--gradient-subtle)' }}>
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
                    <div className="font-bold text-foreground text-lg">{featuredReview.name}</div>
                    {featuredReview.project && (
                      <div className="text-muted-foreground">{featuredReview.project}</div>
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
                Read authentic reviews from clients who have experienced our interior design services 
                and see how we've helped transform their spaces and lives.
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
                <h3 className="text-2xl font-bold text-foreground mb-4">No reviews yet</h3>
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
                          <div className="flex space-x-1">{renderStars(review.rating)}</div>
                          <Quote className="h-6 w-6 text-accent/30" />
                        </div>
                        <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-4">
                          "{review.review}"
                        </p>
                        <div className="border-t pt-4">
                          <div className="font-semibold text-foreground">{review.name}</div>
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
                <Button onClick={handleShowMore} className="btn-primary" size="lg">
                  Load More Reviews
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-20" style={{ background: 'var(--gradient-subtle)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Trusted by <span className="text-gradient">{reviews.length}+ Clients</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Award,
                  title: 'Award-Winning Design',
                  description: 'Recognized for excellence in interior design with multiple industry awards.',
                },
                {
                  icon: Users,
                  title: 'Satisfied Clients',
                  description: `Over ${reviews.length} happy clients who love their transformed spaces.`,
                },
                {
                  icon: Star,
                  title: '5-Star Service',
                  description: 'Consistently rated 5 stars for quality, professionalism, and results.',
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
                  <h3 className="text-xl font-bold text-foreground mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CallToAction/>
      </main>
      <Footer />
    </>
  );
}