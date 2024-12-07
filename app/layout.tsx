import { Poppins } from "next/font/google";
import "./globals.css";
import DefaultLayout from "@/components/layout/Default.layout.comp";
import Script from "next/script";
import AuthCheckLayout from "@/components/layout/Auth-Check.layout.comp";
import ClientLayout from "./client-layout";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const defaultUrl = "https://boostfury.com";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Linkedin personal branding tool | BoostFury",
  description:
    "Grow your LinkedIn profile with AI-powered tools. Create professional LinkedIn posts, and more with our easy-to-use tools.",
  keywords: [
    // Primary Keywords
    "Linkedin growth tool",
    "Linkedin branding tool",
    "Linkedin AI tool",
    "Linkedin content creator",
    "Linkedin post generator",
    // Feature-based Keywords
    "AI content generator",
    // Long-tail Keywords
    "AI-powered social media content creator",
    // Intent-based Keywords
    "free social media content creator",
  ].join(", "),
  authors: [{ name: "Anirban Roy" }],
  creator: "Anirban Roy",
  publisher: "Anirban Roy",
  alternates: {
    canonical: defaultUrl,
    languages: {
      "en-US": "/en-us",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: defaultUrl,
    title: "Linkedin personal branding tool | BoostFury",
    description:
      "Grow your LinkedIn profile with AI-powered tools. Create professional LinkedIn posts, and more with our easy-to-use tools.",
    siteName: "BoostFury",
    images: [
      {
        url: `${defaultUrl}/og/hero-image.png`,
        width: 1200,
        height: 630,
        alt: "BoostFury - LinkedIn personal branding tool",
      },
      {
        url: `${defaultUrl}/og/feature-showcase.png`,
        width: 1800,
        height: 1200,
        alt: "BoostFury - LinkedIn personal branding tool",
      },
      {
        url: `${defaultUrl}/og/templates-preview.jpg`,
        width: 800,
        height: 600,
        alt: "BoostFury - LinkedIn personal branding tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grow Your LinkedIn Audience with AI | BoostFury",
    description:
      "Grow your LinkedIn profile with AI-powered tools. Create professional LinkedIn posts and more with our easy-to-use tools.",
    images: [`${defaultUrl}/og/twitter-card.jpg`],
    creator: "@boostfury",
    site: "@boostfury",
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
    nocache: true,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    bing: process.env.BING_SITE_VERIFICATION,
  },
  applicationName: "BoostFury",
  category: "Technology",
  classification: "Social Media",
  // Additional metadata for rich results
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "BoostFury",
    applicationCategory: "Social Media",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    features: [
      "AI-powered content generation",
      "Post scheduling",
      "LinkedIn post creation and more",
      "Viral post generator",
    ],
  },
};

// Server component for metadata and initial HTML
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Analytics Script */}
        <Script
          defer
          src="https://umami.boostfury.com/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          data-host-url="https://umami.boostfury.com"
          strategy="afterInteractive"
        />
        {/* Preconnect to key domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* manifest.json provides metadata used when your web app is installed on a user's mobile device or desktop */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
