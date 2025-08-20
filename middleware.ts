// middleware.ts

import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Redirect unauthenticated users from admin routes
    // Additional middleware logic can be added here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Only allow admin users to access /admin and /api/admin
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token?.role === "admin";
        }
        return true; // Allow everyone else
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
