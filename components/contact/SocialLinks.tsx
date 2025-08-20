"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FadeIn from "@/components/animations/FadeIn";
import { siteConfig } from "@/lib/config/site";

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    href: siteConfig.links.instagram,
    color: "hover:text-pink-600",
    description: "Follow our latest projects",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: siteConfig.links.facebook,
    color: "hover:text-blue-600",
    description: "Join our community",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: siteConfig.links.linkedin,
    color: "hover:text-blue-700",
    description: "Connect professionally",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: siteConfig.links.twitter,
    color: "hover:text-blue-400",
    description: "Get design tips & updates",
  },
];

export default function SocialLinks() {
  return (
    <FadeIn>
      <Card>
        <CardHeader>
          <CardTitle>Follow Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Stay connected with us on social media for the latest projects, 
            design inspiration, and behind-the-scenes content.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className={`w-full h-auto flex-col space-y-2 p-4 ${social.color} transition-colors`}
                >
                  <social.icon className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium">{social.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {social.description}
                    </div>
                  </div>
                </Button>
              </Link>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              Share your project with us using #KarniInteriors and get featured 
              on our social media!
            </p>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
}
