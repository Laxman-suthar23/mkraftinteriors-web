"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Review {
  id: string;
  name: string;
  email: string;
  rating: number;
  review: string;
  projectId?: string;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
  project?: {
    title: string;
    type: string;
  };
}

export default function TestimonialsPreview() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Fetch first 3 approved reviews from your database
        const response = await fetch("/api/reviews?approved=true&limit=3");
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        // Fallback to empty array if API fails
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-accent fill-current" : "text-muted-foreground/30"
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="skeleton h-12 w-64 mx-auto mb-4" />
            <div className="skeleton h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="skeleton h-64 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Hear from our satisfied clients
            about their experience working with Mkraft Interiors and how we've 
            transformed their spaces.
          </p>
        </motion.div>

        {reviews.length === 0 && !loading ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="bg-card rounded-2xl p-12 max-w-2xl mx-auto shadow-card">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                No Reviews Yet
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We're building relationships with our clients and their testimonials 
                will appear here soon. Stay tuned!
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card rounded-2xl shadow-card hover-lift group">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex space-x-1">
                        {renderStars(review.rating)}
                      </div>
                      <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                        <Quote className="h-6 w-6 text-accent" />
                      </div>
                    </div>
                    
                    <blockquote className="text-muted-foreground mb-6 leading-relaxed text-base">
                      "{review.review}"
                    </blockquote>
                    
                    <div className="border-t border-border pt-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-foreground text-lg mb-1">
                            {review.name}
                          </div>
                          {review.project && (
                            <div className="text-sm text-muted-foreground font-medium">
                              {review.project.title}
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-accent font-semibold bg-accent/10 px-2 py-1 rounded-full">
                          {review.rating}.0
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-accent/10 rounded-2xl p-8 max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Read All Client Stories
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Discover more testimonials from our happy clients and see how we've 
              helped transform their spaces into something truly special.
            </p>
            <Link href="/reviews">
              <Button size="lg" className="btn-primary">
                View All Reviews
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}