"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Menu, Home, FolderOpen, Star, MessageSquare, Phone, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const navigationItems = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
  },
  {
    name: 'Portfolio',
    href: '/portfolio',
    icon: FolderOpen,
  },
  {
    name: 'Gallery',
    href: '/gallery',
    icon: Star,
  },
  {
    name: 'Reviews',
    href: '/reviews',
    icon: MessageSquare,
  },
  {
    name: 'About',
    href: '/about',
    icon: Users,
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: Phone,
  },
];

export default function Sidebar({ isOpen, onClose, className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-80 bg-background border-r transform transition-transform duration-300 ease-in-out z-50',
          'lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <Link href="/" onClick={onClose}>
            <h2 className="text-xl font-bold">Karni Interiors</h2>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-6">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || 
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200',
                      'hover:bg-accent hover:text-accent-foreground',
                      isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-muted-foreground'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Contact Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-muted/50">
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Get in Touch</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>
                <a 
                  href="tel:+15551234567" 
                  className="hover:text-foreground transition-colors"
                >
                  (555) 123-4567
                </a>
              </div>
              <div>
                <a 
                  href="mailto:info@karniinteriors.com"
                  className="hover:text-foreground transition-colors"
                >
                  info@karniinteriors.com
                </a>
              </div>
              <div className="pt-2">
                <p className="text-xs">
                  123 Design District<br />
                  Suite 456<br />
                  Los Angeles, CA 90028
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// Hook for managing sidebar state
export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}

// Mobile menu button component
export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="lg:hidden"
      aria-label="Open menu"
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
}
