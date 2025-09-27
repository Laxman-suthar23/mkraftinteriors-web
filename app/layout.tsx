import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import AuthProvider from "@/components/auth/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Mkraft Interiors - Crafting Spaces, Building Dreams",
    template: "%s | Mkraft Interiors",
  },
  description:
    "Premium interior crafting services transforming blueprints into reality. Expert craftsmen delivering beautiful, functional spaces through precision construction and custom millwork.",
  keywords: [
    "Interior Crafting",
    "Residential Construction",
    "Commercial Build-outs", 
    "Custom Millwork",
    "Space Planning & Construction",
    "Furniture Installation",
    "Project Execution",
    "Turnkey Interior Solutions",
    "Interior Contractors",
    "Custom Interiors",
  ],
  authors: [{ name: "Mkraft Interiors" }],
  creator: "Mkraft Interiors",
  metadataBase: new URL("https://mkraftinterio.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mkraftinterio.com",
    siteName: "Mkraft Interiors",
    title: "Mkraft Interiors - Crafting Spaces, Building Dreams",
    description:
      "Expert interior crafting services bringing designs to life. From concept to completion, we build beautiful, functional spaces with precision craftsmanship.",
    images: [
      {
        url: "/images/og-mkraft-interiors.jpg",
        width: 1200,
        height: 630,
        alt: "Mkraft Interiors - Premium Interior Crafting & Construction",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mkraft Interiors - Crafting Spaces, Building Dreams",
    description:
      "Expert interior crafting services. We don't just design - we build, construct, and craft your vision into reality.",
    images: ["/images/twitter-mkraft-interiors.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
