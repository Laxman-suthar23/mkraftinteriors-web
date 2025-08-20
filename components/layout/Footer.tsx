import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-serif font-bold text-red-500">
                Karni
              </div>
              <div className="text-2xl font-serif font-light text-foreground">
                Interiors
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              Building spaces, creating stories. Transform your environment with
              our expert interior craftsmanship and execution services.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/karniinteriors"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/karniinteriors"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/karniinteriors"
                className="text-muted-foreground hover:text-primary transition-colors"
              ></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-2">
              {[
                { name: "About Us", href: "/about" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "Gallery", href: "/gallery" },
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
                "Residential Construction",
                "Commercial Fit-Outs",
                "Custom Finishing",
                "Structural & Space Execution",
                "Electrical & Lighting Installation",
                "Turnkey Project Delivery",
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
                  #19 Karni Interiors, 2nd main Road, Beside Canara Bank, DLF
                  New Town, Akshaya Nagar.
                  <br />
                  Bangalore, Karnataka, -560068
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="text-muted-foreground text-sm">
                  +91 9845102493
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="text-muted-foreground text-sm">
                  karniinteriors9@gmail.com
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Karni Interiors. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
