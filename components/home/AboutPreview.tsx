"use client";

import { motion } from "framer-motion";
import { CheckCircle, Users, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const stats = [
  { icon: Users, label: "Happy Clients", value: "500+" },
  { icon: Award, label: "Projects Completed", value: "200+" },
  { icon: Clock, label: "Years Experience", value: "15+" },
];

const features = [
  "Custom-Built Solutions",
  "Seamless Project Management",
  "High-Quality Material Selection",
  "3D Visualization & Execution",
];

export default function AboutPreview() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-2 mb-6">
              Building Exceptional Spaces Since 2008
            </h2>
            <p className="body-large mb-8">
              At Karni Interiors, we believe that well-crafted spaces can
              transform not just homes and offices, but the way people live and
              work. Our mission is to build interiors that are both practical
              and visually appealing, tailored to reflect each client’s unique
              needs and style.
            </p>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href="/about">
              <Button size="lg">Learn More About Us</Button>
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[600px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
                alt="Karni Interiors Team at Work"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute bottom-6 left-6 right-6 bg-white dark:bg-card p-6 rounded-lg shadow-lg backdrop-blur-sm"
            >
              <h3 className="font-semibold text-lg mb-2 text-black">
                Award-Winning Creations
              </h3>
              <p className="text-muted-foreground text-sm">
                Recognized by Architectural Digest and featured in leading
                design publications for our innovative approach to crafting
                interiors.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
