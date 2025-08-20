"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Users, Clock, Heart } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const stats = [
  {
    icon: Users,
    number: "200+",
    label: "Happy Clients",
  },
  {
    icon: Award,
    number: "50+",
    label: "Projects Completed",
  },
  {
    icon: Clock,
    number: "15+",
    label: "Years Experience",
  },
  {
    icon: Heart,
    number: "100%",
    label: "Client Satisfaction",
  },
];

export default function CompanyProfile() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <FadeIn direction="left">
            <div>
              <h2 className="heading-2 mb-6">
                Creating Beautiful Spaces Since 2009
              </h2>
              <p className="body-large mb-6">
                Karni Interiors was founded with a simple yet powerful vision: to 
                create beautiful, functional spaces that enhance the way people live 
                and work. What started as a passion project has grown into one of the 
                most trusted interior design firms in the region.
              </p>
              <p className="text-muted-foreground mb-8">
                Our approach combines timeless design principles with contemporary 
                innovation, ensuring every project is both aesthetically stunning 
                and perfectly suited to our clients' needs. We believe that great 
                design has the power to transform not just spaces, but lives.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Images */}
          <FadeIn direction="right">
            <div className="relative">
              <div className="aspect-[4/5] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=800&fit=crop"
                  alt="Our office space"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-lg overflow-hidden border-4 border-background shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&h=200&fit=crop"
                  alt="Team at work"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
