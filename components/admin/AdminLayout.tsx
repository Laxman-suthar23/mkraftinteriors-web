"use client";

import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import {LoadingSpinner} from "@/components/common/LoadingSpinner";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "unauthenticated" || session?.user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access this area.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile overlay */}
      <div className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm opacity-0 pointer-events-none transition-opacity" />
      
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main content */}
      <div className="md:ml-64">
        <AdminHeader />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
