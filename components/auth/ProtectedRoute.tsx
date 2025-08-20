"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import {LoadingSpinner} from "../common/LoadingSpinner";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectPath?: string;
  requiredRole?: string;
}

/**
 * Wrap pages or components that require authentication (and optionally a specific role).
 * Redirects to `redirectPath` (default: "/login") if not authenticated or not authorized.
 */
export default function ProtectedRoute({
  children,
  redirectPath = "/login",
  requiredRole,
}: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If still loading session, do nothing
    if (status === "loading") return;

    // If not authenticated, redirect to login
    if (!session) {
      router.replace(redirectPath);
      return;
    }

    // If a role is required and user does not have it, redirect
    if (requiredRole && session.user.role !== requiredRole) {
      router.replace(redirectPath);
    }
  }, [session, status, requiredRole, redirectPath, router]);

  // While session is loading, show spinner
  if (status === "loading") {
    return <LoadingSpinner />;
  }

  // User is authenticated (and authorized if role required)
  return <>{children}</>;
}
