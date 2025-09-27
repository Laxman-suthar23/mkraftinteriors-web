"use client";

import { motion } from "framer-motion";
import { CheckCircle, Heart, Lightbulb, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: Heart,
    title: 'Passionate Design',
    description: 'We pour our hearts into every project, creating spaces that truly reflect who you are.',
  },
  {
    icon: Lightbulb,
    title: 'Creative Solutions',
    description: 'Innovative approaches to space planning and design challenges, tailored to your needs.',
  },
  {
    icon: Target,
    title: 'Goal-Oriented',
    description: 'Focused on delivering results that exceed expectations and transform your lifestyle.',
  },
  {
    icon: CheckCircle,
    title: 'Quality Assured',
    description: 'Meticulous attention to detail ensures every element meets our high standards.',
  },
];

export default function AboutPreview() {
  return (
    <section className="py-20" style={{ background: 'var(--gradient-subtle)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                About{' '}
                <span className="text-gradient">Mkraft Interiors</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With over a decade of experience in transforming spaces, we specialize in creating 
                interiors that are both beautiful and functional. Our approach combines timeless 
                design principles with contemporary trends to deliver spaces that stand the test of time.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">Why Choose Us?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/about">
                <Button size="lg" className="btn-primary">
                  Learn More About Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image/Stats Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-card rounded-2xl p-8 shadow-elegant">
              <h3 className="text-2xl font-bold text-foreground mb-6">Our Achievements</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '150+', label: 'Projects' },
                  { number: '500+', label: 'Happy Clients' },
                  { number: '10+', label: 'Years' },
                  { number: '25+', label: 'Awards' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-accent mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-primary text-primary-foreground rounded-2xl p-8">
              <blockquote className="text-lg italic leading-relaxed">
                "Design is not just what it looks like and feels like. 
                Design is how it works. We create spaces that work beautifully for your life."
              </blockquote>
              <footer className="mt-4">
                <cite className="text-accent font-semibold">— Mkraft Interiors Team</cite>
              </footer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
