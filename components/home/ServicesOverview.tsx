"use client";

import { motion } from "framer-motion";
import { Home, Building2, Palette, Layout, Lightbulb, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Home,
    title: "Residential Construction",
    description: "From foundation to finishing, we build homes that match your vision and enhance your lifestyle.",
  },
  {
    icon: Building2,
    title: "Commercial Fit-Outs",
    description: "High-quality office and retail build-outs that are functional, durable, and tailored to your business needs.",
  },
  {
    icon: Palette,
    title: "Custom Finishing",
    description: "Expert wall treatments, flooring, and fixtures to give your space a polished, premium look.",
  },
  {
    icon: Layout,
    title: "Structural & Space Execution",
    description: "Smart construction layouts that optimize usability while maintaining visual appeal.",
  },
  {
    icon: Lightbulb,
    title: "Electrical & Lighting Installation",
    description: "Safe and efficient lighting and electrical setups that enhance functionality and ambiance.",
  },
  {
    icon: Settings,
    title: "Turnkey Project Delivery",
    description: "Complete build solutions from start to finish, ensuring on-time delivery with top-quality workmanship.",
  },
];


export default function ServicesOverview() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-2 mb-4">Our Services</h2>
          <p className="body-large max-w-2xl mx-auto">
            From concept to completion, we offer comprehensive interior design
            services tailored to your unique needs and vision.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
