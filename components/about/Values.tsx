"use client";

import { Lightbulb, Users, Palette, CheckCircle } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { Card, CardContent } from "@/components/ui/card";

const coreValues = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We constantly seek new ideas, technologies, and approaches to create unique design solutions.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe great design emerges from close collaboration between our team and clients.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Palette,
    title: "Creativity",
    description: "Every project is an opportunity to push creative boundaries and explore new possibilities.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: CheckCircle,
    title: "Excellence",
    description: "We maintain the highest standards in every aspect of our work, from concept to completion.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

export default function Values() {
  return (
    <section className="section-padding">
      <div className="container">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-6">What Drives Us</h2>
            <p className="body-large max-w-2xl mx-auto">
              Our core values are the foundation of everything we do, guiding our 
              approach to design, client relationships, and business practices.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">
          {coreValues.map((value, index) => (
            <FadeIn key={value.title} delay={index * 0.1}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${value.bg} rounded-lg flex items-center justify-center mb-6`}>
                    <value.icon className={`h-8 w-8 ${value.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">
                    {value.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
