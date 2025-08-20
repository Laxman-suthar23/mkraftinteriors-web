import { useSession } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const isAdmin = session?.user?.role === "admin";
  const user = session?.user;

  return {
    session,
    user,
    isAuthenticated,
    isLoading,
    isAdmin,
    status,
  };
}
