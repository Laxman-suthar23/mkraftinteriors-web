"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";
import logo from "../../public/images/about/logo.jpg";
import { log } from "console";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Reviews", href: "/reviews" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-soft"
          : "bg-background/95 backdrop-blur-sm border-b border-border shadow-soft"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-3">
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

            <div className="flex flex-row sm:items-baseline items-baseline space-x-2 sm:flex-row sm:space-x-2">
              <span className="text-2xl font-bold text-foreground">Mkraft</span>
              <span className="text-xl font-500  text-gradient">Interiors</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent relative py-2 px-1",
                  isActiveLink(item.href)
                    ? "text-accent"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
                {isActiveLink(item.href) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <ThemeToggle />
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="btn-ghost hover:shadow-soft"
              >
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 rounded-full hover-glow"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-background border-t border-border"
            >
              <div className="px-4 py-4 space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                      isActiveLink(item.href)
                        ? "text-accent bg-accent/10"
                        : "text-muted-foreground hover:text-accent hover:bg-accent/5"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Actions */}
                <div className="pt-3 mt-3 border-t border-border space-y-3"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
