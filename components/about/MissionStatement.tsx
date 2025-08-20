"use client";

import { Target, Eye, Heart } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To create exceptional interior spaces that enhance the way people live, work, and interact with their environment.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description: "To be recognized as the leading interior design firm that transforms ordinary spaces into extraordinary experiences.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description: "Integrity, creativity, and client satisfaction guide every decision we make and every project we undertake.",
  },
];

export default function MissionStatement() {
  return (
    <section className="section-padding">
      <div className="container">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-6">Our Purpose & Values</h2>
            <p className="body-large max-w-2xl mx-auto">
              Everything we do is guided by our core mission, vision, and values 
              that have remained constant throughout our journey.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <FadeIn key={value.title} delay={index * 0.2}>
              <Card className="h-full text-center p-8 border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-primary" />
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
