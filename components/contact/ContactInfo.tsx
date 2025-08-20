"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import FadeIn from "@/components/animations/FadeIn";
import { siteConfig } from "@/lib/config/site";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    content: siteConfig.contact.phone,
    href: `tel:${siteConfig.contact.phone}`,
  },
  {
    icon: Mail,
    title: "Email",
    content: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: MapPin,
    title: "Address",
    content: siteConfig.contact.address.full,
    href: `https://maps.google.com/?q=${encodeURIComponent(siteConfig.contact.address.full)}`,
  },
];

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <FadeIn>
        <div>
          <h2 className="heading-3 mb-6">Get in Touch</h2>
          <p className="text-muted-foreground mb-8">
            Ready to transform your space? We'd love to hear about your project 
            and discuss how we can bring your vision to life.
          </p>
        </div>
      </FadeIn>

      <div className="grid gap-6">
        {contactInfo.map((item, index) => (
          <FadeIn key={item.title} delay={index * 0.1}>
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <a
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      target={item.title === "Address" ? "_blank" : undefined}
                      rel={item.title === "Address" ? "noopener noreferrer" : undefined}
                    >
                      {item.content}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>

      {/* Business Hours */}
      <FadeIn delay={0.4}>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-4">Business Hours</h3>
                <div className="space-y-2 text-sm">
                  {Object.entries(siteConfig.businessHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="capitalize text-muted-foreground">{day}</span>
                      <span className={hours === "Closed" ? "text-red-500" : ""}>
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
