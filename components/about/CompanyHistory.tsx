"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Award, Users } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

const milestones = [
  {
    year: "2009",
    title: "Company Founded",
    description: "Karni Interiors was established with a vision to create beautiful, functional spaces.",
    icon: MapPin,
  },
  {
    year: "2012",
    title: "First Commercial Project",
    description: "Expanded into commercial design with our first major office renovation project.",
    icon: Users,
  },
  {
    year: "2015",
    title: "Award Recognition",
    description: "Received the 'Best Interior Design Firm' award from the Regional Design Council.",
    icon: Award,
  },
  {
    year: "2018",
    title: "Team Expansion",
    description: "Grew our team to include specialized designers and project managers.",
    icon: Users,
  },
  {
    year: "2021",
    title: "Digital Innovation",
    description: "Launched virtual design consultations and 3D visualization services.",
    icon: Calendar,
  },
  {
    year: "2024",
    title: "Sustainable Design",
    description: "Pioneered eco-friendly design practices and sustainable material sourcing.",
    icon: Award,
  },
];

export default function CompanyHistory() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-6">Our Journey</h2>
            <p className="body-large max-w-2xl mx-auto">
              From humble beginnings to industry leadership, discover the key 
              milestones that have shaped Karni Interiors over the years.
            </p>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex items-start space-x-8"
              >
                {/* Timeline Dot */}
                <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg hidden md:flex">
                  <milestone.icon className="h-8 w-8 text-primary-foreground" />
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="bg-background rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="md:hidden w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <milestone.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <span className="text-3xl font-bold text-primary">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-semibold mt-1">
                          {milestone.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
