"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Gallery", href: "/gallery" },
  { name: "Reviews", href: "/reviews" },
  { name: "Contact", href: "/contact" },
];

interface NavigationProps {
  className?: string;
  onItemClick?: () => void;
}

export default function Navigation({ className, onItemClick }: NavigationProps) {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <nav className={cn("flex items-center space-x-8", className)}>
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        const isHovered = hoveredPath === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
            onMouseEnter={() => setHoveredPath(item.href)}
            onMouseLeave={() => setHoveredPath(null)}
          >
            {item.name}
            {(isActive || isHovered) && (
              <motion.div
                className="absolute inset-0 bg-primary/10 rounded-md -z-10"
                layoutId={isActive ? "activeTab" : "hoverTab"}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
