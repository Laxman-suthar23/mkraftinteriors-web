"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";

const Footer = () => {
  const handlePhoneCall = () => {
    window.open("tel:+1234567890", "_self");
  };

  const handleEmailClick = () => {
    window.open("mailto:hello@mkraftinteriors.com", "_blank");
  };

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center align-baseline space-x-2">
              <div className="w-10 pt-1 h-10 flex items-center justify-center">
                <Image
                  src="/images/about/Mkraft-logo.svg" // SVG format
                  alt="Mkraft Interiors Logo"
                  width={32}
                  height={32}
                  className="rounded-lg shadow-card hover-glow transition-all duration-300"
                  priority={true}
                />
              </div>
              <div className="text-2xl font-serif pt-1 font-bold text-primary">
                Mkraft
              </div>
              <div className="text-2xl font-serif font-light text-foreground">
                Interiors
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Creating beautiful, functional spaces that reflect your unique
              style and personality. Transform your home with our expert
              interior services.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/mkraftinteriors"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/mkraftinteriors"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/mkraftinteriors"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "About ", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "Reviews", href: "/reviews" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <div className="space-y-2">
              {[
                "Residential Design",
                "Commercial Design",
                "Space Planning",
                "Color Consultation",
                "Furniture Selection",
                "Project Management",
              ].map((service) => (
                <div key={service} className="text-muted-foreground text-sm">
                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                <div className="text-muted-foreground text-sm">
                  Block No. 7, Gate No. 676,
                  <br />
                  Vishwakarma Industrial Estate,
                  <br />
                  M.NO. 1037, Velu, Tal-Bhor
                  <br />
                  Dist.Pune , Maharashtra -412205
                </div>
              </div>

              <div
                onClick={handlePhoneCall}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors" />
                <div className="text-muted-foreground text-sm group-hover:text-primary transition-colors">
                  +91 99229 07176
                </div>
                <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div
                onClick={handleEmailClick}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors" />
                <div className="text-muted-foreground text-sm group-hover:text-primary transition-colors">
                  hello@mkraftinteriors.com
                </div>
                <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Mkraft Interiors. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
