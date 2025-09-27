"use client";

import { motion } from "framer-motion";
import { Home, Building2, Palette, Layout, ShoppingBag, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Home,
    title: 'Residential Design',
    description: 'Complete home transformations from concept to completion. We create living spaces that reflect your personality and lifestyle.',
    features: ['Living Rooms', 'Bedrooms', 'Kitchens', 'Bathrooms'],
  },
  {
    icon: Building2,
    title: 'Commercial Design',
    description: 'Professional spaces that inspire productivity and leave lasting impressions on clients and employees.',
    features: ['Offices', 'Retail Spaces', 'Restaurants', 'Hotels'],
  },
  {
    icon: Layout,
    title: 'Space Planning',
    description: 'Optimize your space with strategic planning that maximizes functionality while maintaining aesthetic appeal.',
    features: ['Layout Design', 'Traffic Flow', 'Storage Solutions', 'Multi-purpose Areas'],
  },
  {
    icon: Palette,
    title: 'Color Consultation',
    description: 'Expert color schemes that create the perfect mood and atmosphere for every room in your space.',
    features: ['Color Psychology', 'Paint Selection', 'Accent Colors', 'Seasonal Updates'],
  },
  {
    icon: ShoppingBag,
    title: 'Furniture & Decor',
    description: 'Curated selection of furniture and accessories that perfectly complement your design vision.',
    features: ['Custom Furniture', 'Art Selection', 'Lighting Design', 'Textile Coordination'],
  },
  {
    icon: Wrench,
    title: 'Project Management',
    description: 'End-to-end project coordination ensuring your design comes to life on time and within budget.',
    features: ['Timeline Management', 'Contractor Coordination', 'Quality Control', 'Budget Oversight'],
  },
];

export default function ServicesOverview() {
  return (
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
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From concept to completion, we offer comprehensive interior design services 
            tailored to transform your space into something extraordinary.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 shadow-card hover-lift group"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                  <service.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Includes:
                </h4>
                <ul className="space-y-1">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-accent/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Transform Your Space?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Get in touch with our expert design team to discuss your project. 
              We'll help bring your vision to life with personalized service and attention to detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-flex items-center justify-center rounded-lg px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:shadow-elegant focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50 transition-all" style={{ background: 'var(--gradient-primary)' }}>
                Get Free Consultation
              </a>
              <a href="/portfolio" className="inline-flex items-center justify-center rounded-lg bg-transparent border border-border px-8 py-3 text-sm font-semibold hover:bg-secondary hover:shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 transition-all">
                View Our Portfolio
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}