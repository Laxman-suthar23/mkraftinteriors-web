import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import AuthProvider from "@/components/auth/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Better performance
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mkraft Interiors - Premium Interior Design & Construction Services",
    template: "%s | Mkraft Interiors",
  },
  description:
    "Leading interior design and construction company specializing in residential and commercial spaces. Expert craftsmen delivering turnkey interior solutions with custom millwork, space planning, and project execution across India.",
  keywords: [
    "interior design",
    "interior designers",
    "interior construction",
    "custom millwork",
    "residential interior design",
    "commercial interior design",
    "home interior design",
    "office interior design",
    "interior contractors",
    "space planning",
    "furniture installation",
    "turnkey interior solutions",
    "interior design company",
    "best interior designers",
  ],
  authors: [{ name: "Mkraft Interiors" }],
  creator: "Mkraft Interiors",
  publisher: "Mkraft Interiors",
  metadataBase: new URL("https://www.mkraftinteriors.com"), // FIXED URL
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.mkraftinteriors.com",
    siteName: "Mkraft Interiors",
    title: "Mkraft Interiors - Premium Interior Design & Construction Services",
    description:
      "Transform your space with expert interior design and construction. From concept to completion, we craft beautiful, functional interiors for homes and businesses.",
    images: [
      {
        url: "/og-image.jpg", // Create a dedicated OG image
        width: 1200,
        height: 630,
        alt: "Mkraft Interiors - Premium Interior Design Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mkraft Interiors - Premium Interior Design & Construction",
    description:
      "Expert interior design and construction services. We build, craft, and transform spaces into beautiful realities.",
    images: ["/twitter-image.jpg"],
    creator: "@mkraftinteriors", // Add your Twitter handle if you have one
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
  verification: {
    google: "your-google-verification-code", // Add after setting up Google Search Console
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  category: "Interior Design",
};

// JSON-LD Structured Data for better SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InteriorDesignCompany",
  name: "Mkraft Interiors",
  image: "https://www.mkraftinteriors.com/logo.svg",
  url: "https://www.mkraftinteriors.com",
  telephone: "+91-9922907176", // Add your phone number
  email: "info@mkraftinteriors.com", // Add your email
  address: {
    "@type": "Block no. 7, Vishwakarma Industrial estate, Velu, Sasewadi",
    streetAddress: "Your Street Address",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "412205",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "18.366461",
    longitude: "73.852704",
  },
  areaServed: [
    {
      "@type": "State",
      name: "Maharashtra",
    },
    // Add more areas you serve
  ],
  priceRange: "$$-$$$",
  sameAs: [
    "https://www.facebook.com/mkraftinteriors", // Add your social media
    "https://www.instagram.com/mkraftinteriors",
    "https://www.linkedin.com/company/mkraftinteriors",
  ],
     // ... your existing metadata
     verification: {
       google: "google7c41143b4f9b2b84.html",
     },
  description:
    "Premium interior design and construction services specializing in residential and commercial spaces with custom millwork and turnkey solutions.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127", // Update with real data
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Interior Design Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Residential Interior Design",
          description: "Complete home transformations from concept to completion",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Commercial Interior Design",
          description: "Professional spaces for offices, retail, and hospitality",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Millwork",
          description: "Bespoke furniture and cabinetry solutions",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
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