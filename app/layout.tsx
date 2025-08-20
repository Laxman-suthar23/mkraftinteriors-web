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
    default: "Karni Interiors - Designing Spaces, Creating Stories",
    template: "%s | Karni Interiors",
  },
  description:
    "Premium interior crafting services, turning designs into beautiful, functional spaces that reflect your lifestyle and personality. Transform your space with Karni Interiors.",
  keywords: [
    "Residential Construction",
    "Commercial Fit-Outs",
    "Custom Finishing",
    "Structural & Space Execution",
    "Electrical & Lighting Installation",
    "Turnkey Project Delivery",
  ],
  authors: [{ name: "Karni Interiors" }],
  creator: "Karni Interiors",
  metadataBase: new URL("https://karniinteriors.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://karniinteriors.com",
    siteName: "Karni Interiors",
    title: "Karni Interiors - Designing Spaces, Creating Stories",
    description:
      "Premium interior design services creating beautiful, functional spaces that reflect your unique lifestyle and personality.",
    images: [
      {
        url: "public/logo.svg",
        width: 1200,
        height: 630,
        alt: "Karni Interiors - Premium Interior Crafting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karni Interiors – Crafting Spaces, Shaping Stories",
    description:
      "Premium interior crafting services, bringing designs to life with beautiful, functional spaces.",
    images: ["/images/og-image.jpg"],
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
